const { location}=require('../controllers/location')
const db= require('../config/db');
const app = require('../server');
const request = require('supertest');

const mockResponse=()=>{
    const res={}
    res.status=jest.fn().mockReturnValue(res)
    res.json=jest.fn().mockReturnValue(res)
    return res
}

beforeAll(async () => await db.connect());
// afterAll(async () => await db.clear());
afterAll(async () => await db.close());

describe("For adding location",()=>{
    it("it should add location",async()=>{
        const res=mockResponse()
        let req={
            body:{
                city:"New delhi",
                state:"Delhi"
            }
        }       
        await location(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        console.log(res.json.mock.calls[0], "dfghj")
        expect(res.json).toHaveBeenCalled()
    })

    it("it should add location",async()=>{
        const res=mockResponse()
        let req={
            body:{
                city: "Dharamshala",
                state: "Himachal Pradesh",
            }
        }       
        await location(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        console.log(res.json.mock.calls[0], "dfghj")
        expect(res.json).toHaveBeenCalled()
    })

    it("it should not add duplicate location",async()=>{
        const res=mockResponse()
        let req={
            body:{
                city:"New delhi",
                state:"Delhi"
            }
        }       
        await location(req,res)
        expect(res.status).toHaveBeenCalledWith(400)
        console.log(res.json.mock.calls[0], "dfghj")
        expect(res.json).toHaveBeenCalled()
    })
    it("it should not add location",async()=>{
        const res=mockResponse()
        let req={
            body:{
               
            }
        }       
        await location(req,res)
        expect(res.status).toHaveBeenCalledWith(500)
        console.log(res.json.mock.calls[0], "dfghj")
        expect(res.json).toHaveBeenCalled()
    })

    
})