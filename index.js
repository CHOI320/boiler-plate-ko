const express = require('express'); // express 모듈을 가져옴
const app = express(); // 가져온 express 함수로 새로운 express app을 만듬
const port = 5000; // 포트는 자유 기본
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User'); // 데이터베이스 가져오기

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! ~~ ')
});

app.post('/register', (req, res) => {

  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body); // req.body: 안에는 json 형태로 데이트가 들어가 있음 (body-parser가 기능을 해줌)

  // save: 몽고DB에서 오는 메소드
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ // status(200): 성공
      success: true
    });
  }); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});