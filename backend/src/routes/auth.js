import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
const router=Router();
const token=(u)=>jwt.sign({id:u.id,name:u.name,email:u.email,role:u.role},process.env.JWT_SECRET,{expiresIn:"7d"});

router.post("/register",async(req,res)=>{
  const {name,email,password,phone}=req.body;
  if(!name||!email||!password||password.length<6) return res.status(400).json({message:"Valid name, email, and password are required."});
  try{
    const hash=await bcrypt.hash(password,12);
    const r=await pool.query(`INSERT INTO users(name,email,password_hash,phone) VALUES($1,$2,$3,$4)
      RETURNING id,name,email,phone,role`,[name.trim(),email.toLowerCase(),hash,phone||null]);
    res.status(201).json({user:r.rows[0],token:token(r.rows[0])});
  }catch(e){
    if(e.code==="23505") return res.status(409).json({message:"Email already registered."});
    console.error(e); res.status(500).json({message:"Registration failed."});
  }
});

router.post("/login",async(req,res)=>{
  try{
    const r=await pool.query("SELECT * FROM users WHERE email=$1",[req.body.email?.toLowerCase()]);
    const u=r.rows[0];
    if(!u||!(await bcrypt.compare(req.body.password||"",u.password_hash))) return res.status(401).json({message:"Invalid email or password."});
    const safe={id:u.id,name:u.name,email:u.email,phone:u.phone,role:u.role};
    res.json({user:safe,token:token(safe)});
  }catch(e){console.error(e);res.status(500).json({message:"Login failed."});}
});
export default router;
