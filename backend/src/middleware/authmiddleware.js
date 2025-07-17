import jwt from "jsonwebtoken";

export const authMiddleware = async(req, res, next) => {
    try{
     const token = req.cookies.token;
    if (!token) return res.status(401).json({success:false, message: "Unauthorized" });

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.userId = decoded.id;
   next();
}catch (err) {
     return res.status(403).json({ success: false, message: "Invalid or expired token" });
   }
}