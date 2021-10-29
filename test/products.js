const chai = require('chai')
const chaiHttp = require('chai-http')
const API_URL = 'http://localhost:2000'

chai.should()
chai.use(chaiHttp)

describe('Api for products', () => {

  describe('GET /product', () => {
    it('it should get the product', (done) => {
      chai.request(API_URL)
        .get('/products')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        })
    })
  })

  describe('POST /product', () => {
    it('it should add the product', (done) => {
      chai.request(API_URL)
        .post('/product')
        .send({
          name: 'Milo',
          price: 10.9
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.be.property('product');
          done();
        })
    })
  })
  
})
