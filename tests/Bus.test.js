const db= require('../config/db');
const app = require('../server');
const request = require('supertest');
const {createBus}=require('../controllers/Bus')
const location=require('../models/Location')


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

beforeAll(async () => await db.connect());
// afterAll(async () => await db.clear());
afterAll(async () => await db.close());



describe('testing CreateBus', ()=>{
  const mockRequest = {
    body: {
      busName: "Volvo",
      vehicleNo: "MP 06 2021",
      seats: 12,
      driver:9210899070,
      policy:
        "u can change the date of your journey we will not chrge anything for that and you can also cancle your tickets before 8 hour from your journey is being started....",
      images: ["www.google.com"],
      fare: 800,
      schedule: [0, 1, 2, 3, 4, 5],
      from: {
        city: "New Delhi",
        state: "Delhi",
      },
      to: {
        city: "Dharamshala",
        state: "Himachal Pradesh",
      },
      arrivalTime: "11 PM",
      departureTime: "5 AM",
    },
    user: { id: "60ec11b5818f7851760e198c" },
  };
   

    it("it should create Bus------ ",async()=>{
      const res=mockResponse()
      const req= {body: {
        busName: "Volvo",
        vehicleNo: "MP 06 2021",
        seats: 10,
        Staff_Number:9210899056,
        driver:9210899070,
        policy:
          "u can change the date of your journey we will not chrge anything for that and you can also cancle your tickets before 8 hour from your journey is being started....",
        images: ["www.google.com"],
        fare: 800,
        schedule: [0, 1, 2, 3, 4, 5],
        from:"Delhi",
        to: "Dharamshala",
        arrivalTime: "11 PM",
        departureTime: "5 AM",
      },
      user: { id: "60ec11b5818f7851760e198c" },}
      console.log(res.json.mock.calls[0],"frferfrrrrrr")
      await createBus(req,res)

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalled();

  },30000)
})
