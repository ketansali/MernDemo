const { generateToken } = require("../middleware/authMiddleware");
const Users = require("../models/users");

exports.signUp = async (req, res) => {
  try {
    Users.findOne({ email: { $regex: req.body.email, $options: "i" } }).exec(
      async (error, user) => {
        if (error) throw new Error(error);
        if (user)
          return res.status(400).json({
            error: "User Already Exists",
          });
        let userInfo = await Users.create(req.body);
        if (userInfo) {
          const {
            firstName,
            lastName,
            email,
            _id
          } = userInfo;
          return res.status(201).json({
            message: "User SignUp Successfully",
            firstName,
            lastName,
            email,
            token : generateToken(_id)
          });
        } else {
          res.status(404);
          throw new Error("User Not Found");
        }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};
exports.signIn = async (req, res) => {
    try {
      Users.findOne({ email: { $regex: req.body.email, $options: "i" } }).select('+password').exec(
        async (error, user) => {
          if (error) throw new Error(error);
          if (user){
            const isMacth = await user.authenticated(req.body.password)
                if(isMacth){
                    const {
                        firstName,
                        lastName,
                        email,
                        _id
                      } = user;
                    return res.status(200).json({
                        message : 'LogIn Successfully',
                        firstName,
                        lastName,
                        email,
                        token : generateToken(_id)
                    })
                }else{
                    res.status(404).json({
                        error : "Invalid Password!!"
                    }) 
                }
          }else{
            res.status(404).json({
              error : "User Not Existed"
            })
          }
            
        }
      );
    } catch (error) {
      throw new Error(error);
    }
};
