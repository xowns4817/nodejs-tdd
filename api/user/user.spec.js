// 테스트 코드const request = require('supertest');
const should = require('should');
const app = require('../../index');
const request = require('supertest');

/**
 * GET /users
 * - success
 *  - 유저 객체를 담은 배열로 응답한다.
 *  - 최대 limit 갯수만큼 응답한다.
 * - error 
 *  - limit이 숫자형이 아니면 400을 응답한다.
 *  - offset이 숫자형이 아니면 400을 응답한다.
 *
 */
describe('GET /users', ()=> {
    describe('성공시', ()=> {
        it('유저 객체를 담은 배열로 응답한다.', (done)=> {
            request(app)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });

        it('최대 limit 갯수만큼 응답한다  ', (done)=> {
            request(app)
                .get('/users?limit=2')
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });

    describe('실패시', ()=> {
        it('limit이 숫자형이 아니면 400을 응답한다', (done)=> {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

/**
 * GET /users/:id
 *  - success
 *    - id를 가진 유저 객체를 반환한다.
 *  - error
 *    - id가 숫자가 아닐경우 400으로 응답한다.
 *    - id로 유저를 찾을 수 없을 경우 404로 응답한다.
 *
 */
describe('GET /user/:id', ()=> {
    describe('성공시', ()=> {
        it('id가 1인 유저 객체를 반환한다.', (done)=> {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    });

    describe('실패시', ()=> {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done)=> {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    })
})

/**
 * DELETE /users/:id
 * 
 * - success 
 *   - 204를 응답한다.
 * - error
 *   - id가 숫자가 아닐경우 400으로 응답한다.
 */
describe('DELETE /user/:id', ()=> {

    describe('성공시', ()=> {
        it('204를 응답한다', (done)=> {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });

    describe('실패시', ()=> {
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=> {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
})

/**
 * POST /users
 * 
 *  - success 
 *   - 201 상태코드를 반환한다.
 *   - 생성된 유저 객체를 반환한다.
 *   - 입력한 name을 반환한다.
 *  - error
 *   - name 파라미터 누락시 400을 반환한다.
 *   - name이 중복일 경우 409를 반환한다.
 */
describe('POST /users', ()=> {
    describe('성공시', ()=> {
        let name = 'kimCoding';
        let body;
        before(done=> {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });
        it('생성된 유저 객체를 반환한다.',  ()=>{
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', ()=> {
            body.should.have.property('name', name);
        })
    });

    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.', (done)=> {
            request(app)
                .post('/users')
                .send({name: 'kimCoding'})
                .expect(409)
                .end(done);
        })
    })
})

/**
 *  PUT /users/:id
 * - success
 *   - 변경된 name을 응답한다.
 * - error
 *   - 정수가 아닌 id일 경우 400 응답
 *   - name이 없을 경우 400 응답
 *   - 없는 유저일 경우 404 응답
 *   - 이름이 중복일 경우 409 응답
 */
describe('PUT /users/:id', ( )=> {
    describe('성공시', ()=> {
        it('변경된 name을 응답한다.', (done)=> {
            const name = 'ktj';
            request(app)
                .put('/users/2')
                .expect(200)
                .send({name})
                .end((err, res)=> {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });

    describe('실패시', ()=> {
        it('정수가 아닌 id일 경우 400을 응답한다.', (done) => {
            request(app)
                .put('/users/kimCoding')
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400응답', (done) => {
            request(app)
                .put('/users/2')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404을 응답한다.', (done) => {
            request(app)
                .put('/users/999')
                .send({name: 'kkk9418'})
                .expect(404)
                .end(done);
        });
        it('이름이 중복일 경우 409 응답', (done) => {
            request(app)
                .put('/users/2')
                .send({name: 'taejoon'})
                .expect(409)
                .end(done);
        });
    })
});


//node_modules/.bin/mocha index.spec.js