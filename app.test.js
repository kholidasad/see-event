const request = require('supertest')
const app = require('./app.js')

describe('Event', () => {
    it('filter', async (done) => {
            const filter = await request(app).get('/event/search')
            .query({title: 'How'})
            .expect('Content-Type', /json/)
            .expect(200)
            .done()
    })
    it('post event', async (done) => {
        // return
        let body = {
            title: 'How are',
            description: 'waks',
            category: 'Design',
            date: '2012-10-2',
            image: 'waks',
            user_id: 2
        }
            const event = await request(app).post('/event')
            .send(body)
            .end(function(err,res) {
                // ! error -> testing selesai
                if (err) done(err)
                // ! not err
                expect(res.status).toBe(200);
                expect(typeof res.body).toEqual('object')
                // expect(res.body).toHaveProperty('access_token')
                // expect(res.body).toEqual({
                //   access_token: expect.any(String)
                // })
                done()
            })
        })
})