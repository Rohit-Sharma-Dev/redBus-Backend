const {addStaff}=require('../controllers/staff')
const db= require('../config/db');
const app = require('../server');
const request = require('supertest');
const staff = require('../models/Staff')


const mockResponse=()=>{
    const res={}
    res.status=jest.fn().mockReturnValue(res)
    res.json=jest.fn().mockReturnValue(res)
    return res
}

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());


describe("it should add staff",()=>{
    it("it should add staff",async()=>{
        const res=mockResponse()
        let req = {
            body:{
                phone:9210899070,
                name:"deepak",
                address:"New Delhi",
                isDriver:true
            },
             user:'60e8598ce58ae2d6b57e8e76' }
            const FindStaff = await staff.findOne({phone:9210899070});
            console.log(FindStaff,"sdfghj")
            
            await addStaff(req,res)
            expect(res.status).toHaveBeenCalledWith(200)
            
            await addStaff(req,res)
console.log(res.json.mock.calls[0])
            expect(res.json).toHaveBeenCalledWith({msg:"staff added successfully"})
    })

    it("it should add helper",async()=>{
        const res=mockResponse()
        let req = {
            body:{
                phone:9210899056,
                name:"sonu",
                address:"New Delhi",
                isDriver:false
            },
             user:'60e8598ce58ae2d6b57e8e76' }
            const FindStaff = await staff.findOne({phone:9210899070});
            console.log(FindStaff,"sdfghj")
            
            await addStaff(req,res)
            expect(res.status).toHaveBeenCalledWith(200)
            
            await addStaff(req,res)
console.log(res.json.mock.calls[0])
            expect(res.json).toHaveBeenCalledWith({msg:"staff added successfully"})
    })

    it("it should not add existing staff",async()=>{
        const res=mockResponse()
        let req = {
            body:{
                phone:9210899070,
                name:"rohit",
                address:"New Delhi",
                isDriver:true
            },
        user:'60e8598ce58ae2d6b57e8e76' }
            
        await addStaff(req,res)
        expect(res.status).toHaveBeenCalledWith(400)

        expect(res.json).toHaveBeenCalled()
    })
})