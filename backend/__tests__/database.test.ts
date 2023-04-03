import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
//   const mongoUri = await mongoServer.getUri();
  await mongoose.connect("mongodb://127.0.0.1:27017/tddDabase");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Database Connection', () => {
  it('should connect to the database', () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });
});
