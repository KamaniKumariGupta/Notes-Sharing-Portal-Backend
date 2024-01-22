const form = require("../Models/Form")
exports.addForm = async (req,res,next) =>{
  try{
  const{ name, PhoneNo ,email,message,interest} = req.body
  const _form = new  form(req.body)
 await  _form.save()
 req.subject = "User Registration"
 req.text = "You have successfully signed up"
next()
  }catch (error){
    console.log(error)
    res.status(400).json({message:"error"})
  }
}
