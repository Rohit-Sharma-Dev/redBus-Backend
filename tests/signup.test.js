const db= require('../config/db');
const app = require('../server')
const request = require('supertest');
const User = require('../models/Users');

const {signup,login}=require("../controllers/users")


beforeAll(async () => await db.connect());
// afterAll(async () => await db.clear());
afterAll(async () => await db.close());


const mockResponse=()=>{
    const res={}
    res.status=jest.fn().mockReturnValue(res)
    res.json=jest.fn().mockReturnValue(res)
    return res
}




describe("it should create a user",()=>{

    it('it should create a new user',async()=>{
    
        const res = await request(app)
        .post('/api/user/signup').send({
            name:'rohit',
            email:"rohitk1234@nav.org",
            password:"123456789",
            isAdmin:true
        })
        expect(res.statusCode).toBe(200)   
    })


    it("it should create a new user++++++++=======",async()=>{
        const res=mockResponse()
        let req={
            body:{
            "name": "rohit",
            "email":"rohit19@email.com",
            "password":"12345678",
            "isAdmin":true}
        }
        
        await signup(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()

    }) 


    it('it should login a user --------',async()=>{
        const res = await request(app)
        .post('/Api/User/login')
        .send({ 
            "email":"rohit19@email.com",
            "password":"12345678",
            })
        expect(res.statusCode).toBe(200) 
    })

    it("it should login a new user ++unit++",async()=>{
        let req={
           body:{  
            "email":"rohit19@email.com",
            "password":"12345678",
        }
        }
        const res=mockResponse()
        await login(req,res)
        expect(res.status).toHaveBeenCalledWith(200)

        expect(res.json).toHaveBeenCalled()
    })


   
  
})



// login Unit testing

describe("it should login a existing user",()=>{
     
    
    // login a user
    
    
})
