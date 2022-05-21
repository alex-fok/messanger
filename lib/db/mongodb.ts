import { MongoClient } from 'mongodb'
const MONGODB_URI = process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV

let cachedClient:MongoClient

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default async function connectToDatabase() {
  if (cachedClient) return cachedClient
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not found')
  }
  const mongoClient = new MongoClient(MONGODB_URI)
  cachedClient = await mongoClient.connect()
  return cachedClient
}
