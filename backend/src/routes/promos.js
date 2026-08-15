import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
const router=Router();

router.post("/validate",async(req,res)=>{
  const {code,amount}=req.body;
  const r=await pool.query(`SELECT * FROM promo_codes WHERE UPPER(code)=UPPER($1) AND active=true
    AND (valid_from IS NULL OR valid_from<=CURRENT_DATE)
    AND (valid_until IS NULL OR valid_until>=CURRENT_DATE)
    AND (max_uses IS NULL OR use_count<max_uses)`,[code]);
  if(!r.rowCount)return res.status(404).json({message:"Promo code is invalid or expired."});
  const p=r.rows[0]; const a=Number(amount||0);
  const discount=p.discount_type==="percent"?a*Number(p.discount_value)/100:Number(p.discount_value);
  res.json({promo:p,discount:Math.min(discount,a)});
});

router.get("/",requireAuth,requireAdmin,async(req,res)=>{
  const r=await pool.query("SELECT * FROM promo_codes ORDER BY code");res.json(r.rows);
});
router.post("/",requireAuth,requireAdmin,async(req,res)=>{
  const b=req.body; const r=await pool.query(`INSERT INTO promo_codes(code,discount_type,discount_value,valid_from,valid_until,max_uses,active)
  VALUES(UPPER($1),$2,$3,$4,$5,$6,$7) RETURNING *`,
  [b.code,b.discountType,b.discountValue,b.validFrom||null,b.validUntil||null,b.maxUses||null,b.active!==false]);
  res.status(201).json(r.rows[0]);
});
router.put("/:id",requireAuth,requireAdmin,async(req,res)=>{
  const b=req.body; const r=await pool.query(`UPDATE promo_codes SET code=UPPER($1),discount_type=$2,discount_value=$3,
  valid_from=$4,valid_until=$5,max_uses=$6,active=$7 WHERE id=$8 RETURNING *`,
  [b.code,b.discountType,b.discountValue,b.validFrom||null,b.validUntil||null,b.maxUses||null,b.active,req.params.id]);
  res.json(r.rows[0]);
});
export default router;
