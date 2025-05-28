import * as chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test de l\'API Users', () => {
  it('GET /users devrait retourner un tableau', (done) => {
    chai.request("http://localhost:5174")  // Teste la route GET /users
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200); // Vérifie le statut 200
        expect(res.body).to.be.an('array'); // Vérifie que la réponse est un tableau
        done();
      });
  });
});

// Test de la route POST /users pour ajouter un utilisateur
it('POST /users devrait ajouter un utilisateur', (done) => {
  chai.request(app)
    .post('/users')
    .send({ name: 'John Doe', email: 'john.doe@example.com', age: 30, role: 'admin' })
    .end((err, res) => {
      expect(res).to.have.status(201); // Vérifie que le statut est 201
      expect(res.body).to.have.property('name').eql('John Doe');
      expect(res.body).to.have.property('email').eql('john.doe@example.com');
      done();
    });
});

// Test de la route PUT /users/:id pour mettre à jour un utilisateur
it('PUT /users/:id devrait modifier un utilisateur', (done) => {
  const userId = 1; // Assurez-vous que cet ID existe dans votre base de données
  chai.request(app)
    .put(`/users/${userId}`)
    .send({ name: 'Jane Doe', email: 'jane.doe@example.com', age: 28, role: 'user' })
    .end((err, res) => {
      expect(res).to.have.status(200); // Vérifie que le statut est 200
      expect(res.body).to.have.property('name').eql('Jane Doe');
      done();
    });
});

// Test de la route DELETE /users/:id pour supprimer un utilisateur
it('DELETE /users/:id devrait supprimer un utilisateur', (done) => {
  const userId = 1; // Assurez-vous que cet ID existe dans votre base de données
  chai.request(app)
    .delete(`/users/${userId}`)
    .end((err, res) => {
      expect(res).to.have.status(200); // Vérifie que le statut est 200
      expect(res.body).to.have.property('message').eql('Utilisateur supprimé avec succès');
      done();
    });
});

// Test d'erreur pour POST /users avec des champs manquants
it('POST /users devrait renvoyer une erreur si les champs sont manquants', (done) => {
  chai.request(app)
    .post('/users')
    .send({ name: 'Invalid User' }) // Manque les autres champs nécessaires
    .end((err, res) => {
      expect(res).to.have.status(400); // Vérifie que le statut est 400
      expect(res.body).to.have.property('error').eql('Tous les champs sont obligatoires.');
      done();
    });
});
