import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import  Stripe from 'stripe'
//placing orders using COD Method


const currency='pkr'
const deliveryCharge =10


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
  
      if (!userId || !items || !amount || !address) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields (userId, items, amount, address)",
        });
      }
  
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "COD",
        payment: false,
        date: Date.now(),
      };
  
      const newOrder = new orderModel(orderData);
      await newOrder.save();
  
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
      return res.json({ success: true, message: "Order Placed", order: newOrder });
    } catch (error) {
      console.error("Error placing the order:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
//placing orders using stripe Method

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Validate input
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (userId, items, amount, address)",
      });
    }

    const { origin } = req.headers;

    // Prepare the order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Map items to Stripe line items format
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge to the line items
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Ensure card payment is enabled
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    // Respond with the session URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error with Stripe payment:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment.",
    });
  }
};

//placing orders using Razorpay Method

const placeOrderRazorpay=async(req,res)=>{




}

// All Orders data for Admin Panel

const allOrders =async(req,res)=>{
    
   try {
    const orders=await orderModel.find({})
    res.json({success:true,orders})
   } catch (error) {
    console.error("Error placing the order:", error);
    return res.status(500).json({ success: false, message: error.message });
}



}

// All Orders data for User (Frontend)
const userOrders =async(req,res)=>{

try {
    const {userId}=req.body;
    const orders= await orderModel.find({userId})
    res.json({success:true,orders})

} catch (error) {
    console.error("Error placing the order:", error);
    return res.status(500).json({ success: false, message: error.message });
}


}
// update Order status from admin panel
const updateStatus =async(req,res)=>{

try {
  const {orderId,status}=req.body
  await orderModel.findByIdAndUpdate(orderId,{status})
  res.json({success:true,message:'Status Updated'})
} catch (error) {
  console.error("Error placing the order:", error);
  return res.status(500).json({ success: false, message: error.message });
}


}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}
