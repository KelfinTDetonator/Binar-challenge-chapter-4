const request = require('supertest')
const app = require('../app')
const userController = require('../src/users/userController')

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

describe("Integration test user controller API", ()=>{
    
    it("GET /accounts/ --> Return status: 200 and all users objects", async()=>{
        const response = await request(app)
                                    .get('/api/v1/accounts')
                                    .set('Accept', 'application/json')
                                    .type('application/json')
                                    //* or
                                    // .expect('Content-Type', /\json/)
        expect(response.headers["content-type"]).toMatch(/\json/);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    bank_name: expect.any(String),
                    bank_account_number: expect.any(String),
                    balance: expect.any(Number),
                    user_id: expect.any(Number)
                })
            ])
        )
        expect(response.statusCode).toBe(200);
    })

    it("POST /users/auth/register --> return user & profile + statusCode 200", async()=>{
        const request = await request(app).post('/auth/register')
                                          .set('Accept', 'application/json') //accept type
                                          .type('application/json') //content type
        expect(request.body).
    })
})
