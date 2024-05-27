/*
 * 할일 앱

restful API 
주소 + http명령어

1. 할 일을 추가할 수 있다. C  /tasks post
2. 할 일 리스트를 볼 수 있다. R  /tasks get
3. 할 일에 대해서 끝남, 안끝남 표시를 할 수 있다. U  /tasks/:id put
4. 할 일을 삭제할 수 있다. D  /tasks/:id

백엔드 준비
1. 기본 셋팅: npm, express, mongoose, app 리스너
2. 라우터를 정의한다
3. 데이터 베이스 스키마 정의
4. 기능 정의: CRUD
5. 테스트: 포스트맨!!!!!!!!!!!!!!

프론트앤드 준비
1. 깃 클론
2. 기능 만들기: CRUD
3. 테스트:
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);
const mongoURI = MONGODB_URI_PROD;
// const mongoURI = 'mongodb://localhost:27017/todo';
// const mongoURI = 'mongodb://127.0.0.1:27017/todo';
// const mongoURI = "mongodb://0.0.0.0:27017/todo";

// 몽고디비의 새로운 주소형태가 있다(옛날형식뿐만 아니라 요즘형식도 잘 도와달라는 의미)
mongoose
.connect(mongoURI, {useNewUrlParser: true })
.then(() => {
  console.log('mongoose connected!')
})
.catch((err) => {
  console.log("DB connection fail", err)
});


// app은 port number 5000번을 계속 주시할거다
app.listen(process.env.PORT || 5000, () => {
  console.log("server on 5000");
});

// 1. 회원가입
// 유저가 이메일, 패스워드, 유저 이름을 입력해서 보냄.
// 받은 정보를 저장함(데이터베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장


// 1. 라우터
// 2. 모델
// 3. 데이터를 저장(이미 가입된 유저 유무, 패스워드 암호화)
// 4. 응답을 보낸다.

// 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가짅 유저가 있는지 확인한다.
// 없으면 로그인 실패
// 있다면 유저정보+토큰
// 프론트에서는 이 정보를 저장
