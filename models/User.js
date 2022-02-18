const mongoose = require('mongoose');

// schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // space를 없애주는 역할
    unique: 1 // 똑같은 이메일을 쓰지 못하게
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { // 사용자 구분을 위해서 (관리자, 일반유저)
    type: Number,
    default: 0
  },
  image: String,
  token: { // 유효성
    type: String
  },
  tokenExp: { // token 사용기간
    type: Number
  }
});

// model
const User = mongoose.model('User', userSchema)

// 다른 곳에서도 사용할 수 있게
module.exports = { User }