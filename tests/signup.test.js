const db= require('../config/db');
const app = require('../server')
const request = require('supertest');
const User = require('../models/Users');

const {signup,login,forgotpassword}=require("../controllers/users")


beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

it("it should create a new user",async()=>{
    let data={
        "name": "rohit",
        "email":"rohit19@email.com",
        "password":"12345678",
        "isAdmin":true
    }
    try {
        const res= await signup(data)
        expect(res.statusCode).toBe(200)
    } catch (err) {
        console.log(err)
    }

})


// login Unit testing

it("it should login a new user ++++",async()=>{
    let data={
        "email":"rohit19@email.com",
        "password":"12345678"
    }
    try {
        const res= await login(data)
        expect(res.statusCode).toBe(200)
    } catch (err) {
        console.log(err)
    }

})

// signUp a user
it('it should create a new user',async()=>{
    
    const res = await request(app)
    .post('/Api/user/signUp').send({
        name:'rohit',
        email:"rohitk1234@nav.org",
        password:"123456789"
    })
    expect(res.statusCode).toBe(200)   
})


// login a user

it('it should login a user ---------',async()=>{
    const res = await request(app)
    .post('/Api/user/login')
    .send({ email:"rohitk1234@nav.org",
            password:"123455678"
        })
    expect(res.statusCode).toBe(400) 
})


// update/reset passwords

// it("Should update password.", async () => {
// 	const res = await request(app)
// 		.put(`/Api/users/login/forgotpassword`)
// 		.send({
//          email:"rohit@navgurukul.org",
// 			password: "password",
// 			newPassword: "pass1234",
// 			confirmPassword: "pass1234",
// 		})
// 		.expect(res.statusCode).toBe(200)

// });

