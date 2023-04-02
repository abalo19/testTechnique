import request from 'supertest';
import { app } from '../../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

describe('UserController', () => {
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
//   const mongoUri = await mongoServer.getUri();
  await mongoose.connect("mongodb://localhost:27017/tddDabase");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

  describe('GET /DataGraph/FindAll', () => {
    it('should return a list of users', async () => {
      // Utilisez Supertest pour tester l'API
      const response = await request(app).get('/DataGraph/FindAll');
      
      // Vérifiez si la réponse est conforme à vos attentes
      expect(response.status).toBe(200);
      expect(response.body.evolution.googleAveragePrices).toBeInstanceOf(Array);
      expect(response.body.evolution.amazonAveragePrices).toBeInstanceOf(Array);
    });
  });

  // Ajoutez d'autres tests pour les autres routes ou méthodes du controller
});
