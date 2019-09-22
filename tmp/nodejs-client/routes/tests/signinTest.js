var request = require('supertest');

describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./server');
        server = server();
    });
    afterEach(function (done) {
        server.close(done);
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    describe('POST /signin', function() {
        it('responds with json', function(done) {
            request(server)
                .post('/signin')
                .send({name: 'john'})
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

});
