import { MongoClient } from 'mongodb'
const {MONGODB_URI, NODE_ENV} = process.env

if (!MONGODB_URI) throw new Error('Cannot find MONGODB_URI')

const client = new MongoClient(MONGODB_URI)

let clientPromise = NODE_ENV === 'development'
  ? global._mongoClientPromise || (global._mongoClientPromise = client.connect())
  : client.connect()

export default clientPromise
