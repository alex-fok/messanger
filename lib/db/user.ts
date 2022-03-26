import { JwtPayload } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import crypto from 'crypto'
import User from './models/user'
import connectToDB from './mongodb'
import verifyToken from '../authentication/verifyToken'
import Chat from './models/chat'
import promisify from '../../utils/promisify'

const create = async (username:string, password:string, nickname:string):Promise<string> => {
  const client = await connectToDB()
  if (!client) throw new Error('Database not found')

  const userCollection = client.db().collection('user') as Collection<User>
  if(await userCollection.findOne({username})) throw new Error('Username already existed')

  const salt = crypto.randomBytes(8).toString('hex')
  const derivedKey = await promisify<Buffer>(crypto.scrypt)(password, salt, 64).catch(() => {
    throw new Error('Error scrypting password')
  })
  const user = new User(username, `${salt}.${derivedKey.toString('hex')}`, nickname, Date.now())
  const {acknowledged} = await userCollection.insertOne(user)
  
  if (!acknowledged) throw new Error('Error creating user account')
  return 'User account created'
  
}

const verify = async (jwt: string):Promise<string | null>=> {
  const verified = await verifyToken(jwt).catch(()=>{})
  if (!verified) return null

  const {username} = verified as JwtPayload 
  return username
}

const get = async (username: string) => {
  const client = await connectToDB()
  const userCollection = client.db().collection('user') as Collection<User>

  const user = await userCollection.findOne({username}).catch(err => {console.error(err)})

  return user ? {
    _id:user._id.toString(),
    username: user.username,
    chats: user.chats || {}
  } : null
}
const getWithJwt = async (jwt: string) => {
  const username = await verify(jwt)
  if (!username) return null 
  const result = await get(username)
  return result
}
const search = async(username:string) => {
  const client = await connectToDB()
  if (!client) throw new Error('User - Search: Database not found')
  
  const userCollection = client.db().collection('user') as Collection<User>
  const result = await userCollection.findOne({username})

  return result
}

const getChats = async (username:string) => {
  const client = await connectToDB()
  const chatCollection = client.db().collection('chat') as Collection<Chat>
  const userCollection = client.db().collection('user') as Collection<User>

  const user = await userCollection.findOne({username})
  const chatArray = await chatCollection.find({
    '_id': { $in: Object.keys(user?.chats || []).map(key => new ObjectId(key))}
  }).toArray()
  return chatArray
}

export default {
  get,
  create,
  getChats,
  verify,
  getWithJwt,
  search
}
