import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
const { default: app } = await import('../app.js');

describe('Users API', () => {
    let userId;

    before(async () => {
        const res = await chai.request(app)
            .post('/api/users')
            .send({ name: 'John Doe', email: 'john@example.com' });
        userId = res.body.id;
    });

    it('should create a new user', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({ name: 'Jane Doe', email: 'jane@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Jane Doe');
                expect(res.body).to.have.property('email', 'jane@example.com');
                done();
            });
    });

    it('should get all users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a user by ID', (done) => {
        chai.request(app)
            .get(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'John Doe');
                expect(res.body).to.have.property('email', 'john@example.com');
                done();
            });
    });

    it('should update a user by ID', (done) => {
        chai.request(app)
            .put(`/api/users/${userId}`)
            .send({ name: 'John Smith', email: 'johnsmith@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'John Smith');
                expect(res.body).to.have.property('email', 'johnsmith@example.com');
                done();
            });
    });

    it('should delete a user by ID', (done) => {
        chai.request(app)
            .delete(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
