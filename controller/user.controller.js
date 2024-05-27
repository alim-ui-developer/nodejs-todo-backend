const User = require("../model/User")
const bcrypt = require('bcrypt');
const saltRounds = 10; // 암호화를 볓 번 시킬건지

const userController = {}

userController.createUser = async (req, res) => {
  try{
    const { email, name, password } = req.body
    const user = await User.findOne({ email })
    // 유저 확인
    if(user) {
      throw new Error("이미 가입이 된 유저입니다")
    }

    // 암호화
    const salt = bcrypt.getSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); 
    const newUser = new User({email, name, password:hash})
    await newUser.save()
    res.status(200).json({status: "success"});
  }catch(error){
    res.status(400).json({status: "fail!!!", message: error.message })
  }
}


userController.loginWithEmail = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findone({ email }, "-createdAt -updateAt -__v");
    if(user) {
      const isMach = bcrypt.compareSync(password, user.password);
      if(isMach){
        const token = use.generateToken();
        return res.status(200).json({ status: "success", user, token})
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
  }catch(error){
    res.status(400).json({ status:"fail", message: error.message })
  }

}

module.exports = userController;