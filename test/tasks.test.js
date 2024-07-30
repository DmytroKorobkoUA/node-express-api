import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
const { default: app } = await import('../app.js');

describe('Tasks API', () => {
    let taskId;

    before(async () => {
        // Создание начальной задачи
        const res = await chai.request(app)
            .post('/api/tasks')
            .send({ title: 'Learn Node.js', completed: false });
        taskId = res.body.id;
    });

    it('should create a new task', (done) => {
        chai.request(app)
            .post('/api/tasks')
            .send({ title: 'Learn Express.js', completed: false })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Express.js');
                expect(res.body).to.have.property('completed', false);
                done();
            });
    });

    it('should get all tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a task by ID', (done) => {
        chai.request(app)
            .get(`/api/tasks/${taskId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Node.js');
                done();
            });
    });

    it('should update a task by ID', (done) => {
        chai.request(app)
            .put(`/api/tasks/${taskId}`)
            .send({ title: 'Learn Advanced Node.js', completed: true })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Learn Advanced Node.js');
                expect(res.body).to.have.property('completed', true);
                done();
            });
    });

    it('should delete a task by ID', (done) => {
        chai.request(app)
            .delete(`/api/tasks/${taskId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
