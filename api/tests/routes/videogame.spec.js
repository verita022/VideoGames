/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const agent = session(app);
const videogame = {
  id: uuidv4(),
  name: 'Super Mario Bros',
  background_image: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/F98B/production/_99838836_mario976.jpg',
  description: 'Juego Clasico',
  genres: 'Platformer',
  platforms: 'PC',

};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
    
  describe('GET /videogames/db', () => {
    it('should get 200 and response with the game we just created', (done) => {
      agent.get('/videogames/db')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.deep.equal(videogame);
      });
      done();
    });
  }); 

  describe('POST /videogames', () => {
    it('responds with a status 404 (bad request) and a string message, if the name, description or platform were not passed', (done)=>{
      agent.post('/')
      .send({name: "Temple Run 2"})
      .expect(400)
      .expect((res) => {
          expect(res.text).to.be.equal('Name, description and platforms fields cant be empty')
      });
      done();  
    })

    it('add a new Game', (done) => {
      agent.post('/api/Appointments')
      .send(videogame)
      .expect(200)
      .expect(() => {
          expect(res.json).to.be.deep.equal(videogame)
      });
      done();
    });


  }); 

});
