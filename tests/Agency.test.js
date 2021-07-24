const {createAgency}=require('../controllers/Agency')
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


describe("it should add Agency",()=>{
    it("it should add Agency",async()=>{
        const res=mockResponse()
        let req = {
            body:{
            phone:9876543210,
            agencyName:"Ram dalal",
            headOfficeLocation:"New Delhi"
            },
            user:'60e8598ce58ae2d6b57e8e76' }
            
            await createAgency(req,res)
            // console.log(res.status.mock.calls)
            expect(res.status).toHaveBeenCalledWith(200)
            // console.log(res.json.mock.calls[0], "dfghj")
            expect(res.json).toHaveBeenCalled()
    })

    it("it should not add an existing Agency",async()=>{
        const res=mockResponse()
        let req = {
            body:{
            phone:9876543210,
            agencyName:"Ram dalal",
            headOfficeLocation:"New Delhi"
            },
            user:'60e8598ce58ae2d6b57e8e76' }
            
            await createAgency(req,res)
            // console.log(res.status.mock.calls)
            expect(res.status).toHaveBeenCalledWith(400)
            console.log(res.json.mock.calls[0], "dfghj")
            expect(res.json).toHaveBeenCalled()
    })

    it("it should not add Agency if the editor is not the admin",async()=>{
        const res=mockResponse()
        let req = {
            body:{
                phone:9876543210,
                agencyName:"Ram dalal",
                headOfficeLocation:"New Delhi"
            },
            user:'60e8598ce58ae2d6b57e8e7' }
            
            await createAgency(req,res)
            // console.log(res.status.mock.calls)
            expect(res.status).toHaveBeenCalledWith(400)
            console.log(res.json.mock.calls[0], "dfghjnknknkkhkh")
            expect(res.json).toHaveBeenCalled()
    })

    it("it should not add Agency if the body is null ",async()=>{
        const res=mockResponse()
        let req = {
            body:{
            
            },
            user:'60e941b8428d8c212323461c' }
            
            await createAgency(req,res)
            // console.log(res.status.mock.calls)
            expect(res.status).toHaveBeenCalledWith(401)
            console.log(res.json.mock.calls[0], "dfghjnknknkkhkh")
            expect(res.json).toHaveBeenCalled()
    })

  
})
