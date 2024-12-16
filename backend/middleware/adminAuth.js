import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        // Handle errors here (e.g., log the error, send an error response)
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default adminAuth;