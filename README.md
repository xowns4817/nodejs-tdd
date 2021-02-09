# nodejs-tdd
nodejs-express 기반 testCode 작성 ( tdd )

## 단위 테스트 (함수의 기능 테스트)
- 모카(mocha) : 테스트 코드를 돌려주는 테스트 러너
- 테스트 수트 : 테스트 환경으로 모카에서는 describe()으로 구현한다.
- 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현한다.
- should.js : 값 validation 검증

## 통합 테스트 ( API의 기능 테스트 )
- superTest : 내부적으로 express 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

```
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

```
