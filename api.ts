import * as express from 'express';
import * as cors from  'cors';
import  * as bodyParser from 'body-parser';
import { ObjectId, MongoClient } from 'mongodb';

export const api = express.Router();

const dbUrl = 'mongodb://localhost:27017/';

const dbClient = MongoClient.connect(dbUrl).then((connection) => connection.db('angular-app'));

dbClient.then(() => {
  console.log('Connected to the database.');
});

async function retrieveFromDb(
  collectionName: string,
  project: any,
  query: any
): Promise<any[]> {
  project['_id'] = 0;
  const db = await dbClient;
  return new Promise((resolve) => {
    db.collection(collectionName)
      .aggregate([
        { $match: query },
        { $project: project },
      ])
      .toArray((err, objects) => {
        resolve(objects);
      });
  });
}

api.get('/products', async (req, res) => {
  console.log('GET products');
  const products = await retrieveFromDb('products', {
    description: 0,
  },{});
  res.send(products);
});

api.get('/products/:id', async (req, res) => {
  const products = await retrieveFromDb(
    'products',
    {},
    { _id: new ObjectId(req.params.id) }
  );

  if (products.length == 0) {
    res.sendStatus(404);
  } else {
    res.send(products[0]);
  }
});

api.use(
  cors({
    origin: true,
    credentials: true,
  })
);

api.use(bodyParser.json());

