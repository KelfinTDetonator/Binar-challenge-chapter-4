const request = require('supertest')
const app = require('../app')
const userController = require('../src/users/userController')


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
    test("Return status: 200 and users objects", async()=>{
        const {body, statusCode} = await request(app).get('/api/v1/accounts')

        expect(body).toEqual(
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
        expect(statusCode).toBe(200);
    })
})
