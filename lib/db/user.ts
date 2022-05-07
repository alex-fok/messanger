import { JwtPayload } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'
import User from './models/user'
import verifyToken from '../authentication/verifyToken'
import promisify from '../../utils/promisify'
import { getUserCollection, getChatCollection } from './connection'

const create = async (username:string, password:string, nickname:string):Promise<string> => {
  const userCollection = await getUserCollection()
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
  const userCollection = await getUserCollection()    
  const user = await userCollection.findOne({username}).catch(err => {console.error(err)})

  return user ? {
    id:user._id.toString(),
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
  const userCollection = await getUserCollection()  
  const result = await userCollection.findOne({username})

  return result
}

const getChats = async (username:string) => {
  const [userCollection, chatCollection] = await Promise.all([getUserCollection(), getChatCollection()])
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
