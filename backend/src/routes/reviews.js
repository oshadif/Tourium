import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
const router=Router();
router.post("/",requireAuth,async(req,res)=>{const {tourId,rating,comment}=req.body;const completed=await pool.query(`SELECT 1 FROM bookings WHERE user_id=$1 AND tour_id=$2 AND payment_status='paid' LIMIT 1`,[req.user.id,tourId]);if(!completed.rowCount)return res.status(403).json({message:"Only paid customers can review this tour."});try{const r=await pool.query(`INSERT INTO reviews(user_id,tour_id,rating,comment) VALUES($1,$2,$3,$4) ON CONFLICT(user_id,tour_id) DO UPDATE SET rating=EXCLUDED.rating,comment=EXCLUDED.comment,status='pending' RETURNING *`,[req.user.id,tourId,rating,comment]);res.status(201).json(r.rows[0]);}catch(e){console.error(e);res.status(500).json({message:"Unable to save review."});}});
router.get("/admin",requireAuth,requireAdmin,async(req,res)=>{const r=await pool.query(`SELECT r.*,u.name,t.title FROM reviews r JOIN users u ON u.id=r.user_id JOIN tours t ON t.id=r.tour_id ORDER BY r.created_at DESC`);res.json(r.rows);});
router.put("/:id/status",requireAuth,requireAdmin,async(req,res)=>{const r=await pool.query("UPDATE reviews SET status=$1 WHERE id=$2 RETURNING *",[req.body.status,req.params.id]);res.json(r.rows[0]);});
export default router;
