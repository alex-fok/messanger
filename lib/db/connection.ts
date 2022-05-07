import { MongoClient, Collection } from 'mongodb'
import Chat from './models/chat'
import User from './models/user'
import connectToDB from './mongodb'

let client:MongoClient,
    chatCollection: Collection<Chat>,
    userCollection: Collection<User>

const getChatCollection = async():Promise<Collection<Chat>> => {
  if (chatCollection) return chatCollection
  if (!client) client = await connectToDB()
  return (chatCollection = client.db().collection('chat'))
}

const getUserCollection = async():Promise<Collection<User>> => {
  if (userCollection) return userCollection
  if (!client) client = await connectToDB()
  return (userCollection = client.db().collection('user'))
}

export {
  getChatCollection,
  getUserCollection
}
