const con = require("../config/config");
const md5 = require('md5');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


exports.registration = async (req, res) => {
 const {name,email,phonenumber,address,usertype,password}=req.body;
 console.log("data of registration",req.body)
 const checkEmail=`select * from users where email=?`;
 try{
  const newPassword= md5(password)
let emailData = await con.promise().query(checkEmail, [email]);
if(emailData[0].length===0){
  const register_data=`insert into users (name,email,phonenumber,address,usertype,password)values(?,?,?,?,?,?)`;
  let register =await con.promise().query(register_data,[name,email,phonenumber,address,usertype,newPassword]);
  if(register){
    res.json({ message: "Registration successful" });
  }
}
else{
  res.json({error:"email is already present"})
}

 }catch (error) {
  res.json({ error: error.message });
}
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newPassword = md5(password);
    const login = 'SELECT * FROM users WHERE email=? AND password=?';
    const [loginResult] = await con.promise().query(login, [email, newPassword]);

    if (!loginResult[0]) {
      res.status(401).send('Email or password is incorrect');
    } else {
      const id = loginResult[0].userid;
      const token = jwt.sign({ id: id }, secretKey, { expiresIn: "3h" });
      res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true });
      res.json({ email,password, token });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};



exports.forgetpassword=async(req,res)=>{
  const {email,password}=req.body
  try {
    console.log(req.body);
    const newPassword= md5(password)
    console.log("object",newPassword);
    const forgetPassword = `update users set password=? where email=?`
    await con.promise().query(forgetPassword,[newPassword,email])
    res.json({ password,email });
  } catch (error) {
    res.json({ error: error.message });
  }
}

