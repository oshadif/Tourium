import jwt from "jsonwebtoken";
export function requireAuth(req,res,next){
  const h=req.headers.authorization;
  if(!h?.startsWith("Bearer ")) return res.status(401).json({message:"Authentication required."});
  try { req.user=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({message:"Invalid or expired token."}); }
}
export function requireAdmin(req,res,next){
  if(req.user?.role!=="admin") return res.status(403).json({message:"Admin access required."});
  next();
}
