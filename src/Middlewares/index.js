const jwt = require("jsonwebtoken")
const {check , validationResult } = require("express-validator")
exports.verifyToken = (req,res,next) =>
{
  try{
   const token = req.headers.authorization
   console.log(token);
   if (token) {
    const data = jwt.verify(token,"MYSECRETKEY@")
    const {id} = data;
    req.id = id;
    next();
    
   } 
   else {
    return res.status(401).json({message:"Token is missing"})
    
   }
  }
  catch (err){
    return res.status(401).json({err})
  }
}

exports.validateForm = [
check("name").notEmpty().withMessage("Please Enter Name"),
check("PhoneNo").isMobilePhone().withMessage("Please Enter valid Phone number"),
check("email").isEmail().withMessage("Please Enter valid email"),
check("message").notEmpty().withMessage("Please Enter Message"),
check("interest").isStrongPassword().withMessage("Please Enter interest")

]

exports.isvalidated = (res,req,next)=>{
  const errors = validationResult(req)
  if(errors.isEmpty()){
    next()

  }
  else{
    res.status(400).json({message:errors.array()[0]})
  }
}