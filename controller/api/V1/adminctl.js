const adminmodel = require("../../../model/adminmodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports.adminRegister = async (req,res)=>{
    try {
        let checkadminData = await adminmodel.findOne({ email: req.body.email })
        console.log(checkadminData)
        if (!checkadminData) {
            if (req.body.password == req.body.confirmpassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let adminRagister = await adminmodel.create(req.body);
                console.log(adminRagister);
                if (adminRagister) {
                    return res.status(200).json({ msg: "user adminRagister successfully", data: adminRagister });
                }
                else {
                    return res.status(200).json({ msg: "Something went wrong while signUp" });
                };
            }
            else {
                return res.status(200).json({ msg: "password & confirm password does not match" });
            };
        }
        else {
            return res.status(200).json({ msg: "Email is already register use another email" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};
module.exports.adminlogin = async (req,res)=>{
    try {
        let checkEmail = await adminmodel.findOne({ email: req.body.email });
        if (checkEmail) {
            let checkPassword = await bcrypt.compare(req.body.password, checkEmail.password);
            if (checkPassword) {
                let token = jwt.sign({ admindata: checkEmail }, "secrateKey");
                return res.status(200).json({ msg: "user login successfully", token });
            }
            else {
                return res.status(200).json({ msg: "Invalid pasword" });
            }
        }
        else {
            return res.status(200).json({ msg: "Email doesn't match" });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
}
module.exports.adminProfil = async (req,res)=>{
    try {
      console.log(req.user)
      return res.status(200).json({ msg: "user  profile", user:req.user});
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};
module.exports.aditadminProfile = async (req,res)=>{
   
    try {
        let updateData = await adminmodel.findById(req.params.id);
        if (updateData) {
            let checkData = await adminmodel.findByIdAndUpdate(updateData._id, req.body);
            if (checkData) {
                return res.status(200).json({ msg: "User data updated successfully", data: checkData });
            }
            else {
                return res.status(200).json({ msg: "Something went wrong while updateing user data" });
            };
        } else {
            return res.status(200).json({ msg: "Something went wrong while trying to update user data" });
        };
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};
module.exports.logout = async (req,res)=>{
    try {
       req.session.destroy((err)=>{
                if (err) {
                    return res.status(400).json({ msg: "user signUp successfully" });
                }
                else {
                    return res.status(400).json({ msg: "go to login page to login" });
                };
            })    
    } 
    catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};
module.exports.changpassword = async (req,res)=>{
    try {
        console.log(req.user)
        console.log(req.body)

        let checkcorentpass = await bcrypt.compare(req.body.curentpass,req.user.password)
        if (checkcorentpass) {
            if (req.body.curentpass!=req.body.newpass) {
                if (req.body.newpass==req.body.confirmPass) {
                req.body.password = await bcrypt.hash(req.body.newpass, 10);
                let updetdata =await adminmodel.findByIdAndUpdate(req.user._id,req.body);
                    if(updetdata){
                        return res.status(200).json({ msg: "password cheng sussefulliy", data:updetdata});
                    }
                    else {
                        return res.status(200).json({ msg: "password not chenge" });
                    }
                }
                else {
                    return res.status(200).json({ msg: "password & confirm password does not match" });
                };
            }
            else {
                return res.status(200).json({ msg: "password & confirm password does not match" });
            };
        }
        else {
            return res.status(200).json({ msg: "Email is already register use another email" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};
