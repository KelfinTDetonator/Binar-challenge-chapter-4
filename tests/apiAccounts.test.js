const request = require('supertest')
const app = require('../app')
const userController = require('../src/users/userController')
const { execSync } = require("child_process");
const prisma = require('../db/')

beforeAll(async()=>{
    await prisma.$connect();
    execSync("npx prisma db push");
});

afterAll(async () => {
    await prisma.$disconnect();
    console.log("___________________________________________________________________________________AFTERALL");
  });
// const user = require('../src/users/userController')
// const mockRequest = (body = {}) => ({body})
// const mockResponse = () => {
//     const res = {}
//     res.json = jest.fn().mockReturnValue(res)
//     res.status = jest.fn().mockReturnValue(res)
//     return res
// }

    // test("Return status: 200 and users objects", async() => {
    //     await request(app)
    //         .get('/api/v1/users/')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) throw err;
    //           });
    // })

// describe("Integration test transaction controller API", ()=>{
    
//     it("GET /accounts/ --> Return status: 200 and all users objects", async ()=>{
//         const response = await request(app)
//                                     .get('/api/v1/accounts')
//                                     .set('Accept', 'application/json')
//                                     .type('application/json')
//                                     //* or
//                                     // .expect('Content-Type', /\json/)
//         expect(response.headers["content-type"]).toMatch(/\json/);
//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     id: expect.any(Number),
//                     bank_name: expect.any(String),
//                     bank_account_number: expect.any(String),
//                     balance: expect.any(Number),
//                     user_id: expect.any(Number)
//                 })
//             ])
//         )
//         expect(response.statusCode).toBe(200);

//     })
  
// })

describe("test", ()=>{
    it("POST /accounts -- success --> response body contains new account JSON + statusCode 200", async()=>{
        const payload = {
            bank_name: "BCA Biasa",
            bank_account_number: "900082423668",
            balance: 900000,
            user_id: 3
        }
        const response = await request(app).post('api/v1/accounts').send(payload).set('Accept', 'application/json')
        .type('application/json')
                                    
         console.log(response)                                 
                                          
                                          
        // req.body = {
        //     "bank_name": "BCA Prioritas",
        //     "bank_account_number": "900082423446",
        //     "balance": 900000,
        //     "id": 7,
        // }
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                data: expect.objectContaining({
                    id: expect.any(Number),
                    bank_name: expect.any(String),
                    bank_account_number: expect.any(String),
                    balance: expect.any(Number),
                    user_id: expect.any(Number),
                }),
                message: expect.any(String)
            })
        )

    })})



    // it("POST /accounts -- failed --> return error object + error status", async()=>{
    //     const req = await request(app).post('/auth/register')
    //                                       .set('Accept', 'application/json') //accept type
    //                                       .type('application/json') //content type
    //                                       .send(
    //                                         {
    //                                             "bank_name": "",
    //                                             "bank_account_number": "",
    //                                             "balance": 0,
    //                                             "user_id": 0,
    //                                         })
    //     // expect(req.body).toEqual({
    //     //     error: 
    //     // })
    // })

