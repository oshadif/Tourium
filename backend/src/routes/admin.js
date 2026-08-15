import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
const router=Router();
router.get("/stats",requireAuth,requireAdmin,async(req,res)=>{
  const [u,t,b,r]=await Promise.all([
    pool.query("SELECT COUNT(*)::int count FROM users"),
    pool.query("SELECT COUNT(*)::int count FROM tours WHERE status='active'"),
    pool.query(`SELECT COUNT(*)::int count,COALESCE(SUM(total_amount_lkr) FILTER(WHERE payment_status='paid'),0) revenue FROM bookings`),
    pool.query("SELECT COUNT(*)::int count FROM reviews WHERE status='pending'")
  ]);
  res.json({users:u.rows[0].count,activeTours:t.rows[0].count,bookings:b.rows[0].count,revenue:Number(b.rows[0].revenue),pendingReviews:r.rows[0].count});
});
export default router;
