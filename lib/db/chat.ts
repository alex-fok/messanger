import connectToDB from './mongodb'
import { Collection, ObjectId } from 'mongodb'
import Chat from './models/chat'
import User from './models/user'
import { MessageType } from '../../types/context'

type CreateChatType =  {
  timestamp: number,
  chatId: ObjectId,
  participantIds: ObjectId[]
}

const addMessage = async(sender:ObjectId, chatId:ObjectId, message:string) => {
  const client = await connectToDB()
  if (!client) throw new Error('Chat - Add Message: Database not found')
    const db = client.db()
    const chatCollection = db.collection('chat') as Collection<Chat>
    const userCollection = db.collection('user') as Collection<User>
    const timestamp = Date.now() 

    const senderInfo = await userCollection.findOne({_id: sender})
    if (!senderInfo) throw new Error('Chat - Add Message: Sender not found')

    const {value} = await chatCollection.findOneAndUpdate(
      {_id:chatId}, 
      {$push: {'history': { timestamp, sender, message }}
    })
    if (!value) throw new Error('Chat - Add Message: Chat not found')
    
    const {acknowledged} = await userCollection.updateMany(
      {_id: { $in: value.participants }},
      { $inc: {[`chats.${value._id.toString()}.unread`]: 1},
        $set: {lastModified: timestamp}
      }
    )
    
    if (!acknowledged) throw new Error('Chat - Add Message: Cannot update/find participants')
    return { timestamp, sender: senderInfo.nickname, message }
}

const create = async(requesterId: ObjectId, participants: string[], message: string) : Promise<CreateChatType> => {
  const client = await connectToDB()
  if (!client) throw new Error('Chat - Create: Database not found')

  const db = client.db()
  const userCollection = db.collection('user') as Collection<User>

  const participantIds: ObjectId[] =
    (await userCollection.find({username: {$in: participants}}).toArray()).map(user => user._id)
    
  // if (!participantIds.includes(requesterId)) participantIds.push(requesterId)
  const timestamp = Date.now()
  const {insertedId} = await db.collection('chat').insertOne(
    new Chat(participantIds, [{timestamp,sender: requesterId, message}])
  )
  // Add chat reference for participants
  const updateParticipants = userCollection.updateMany(
    {_id: {$in: participantIds}},
    { $set: {
      'lastModified': timestamp,
      [`chats.${insertedId}`]: {name: insertedId.toString(), unread: 1}
    }}
  )
  const updateSender = userCollection.updateOne(
    {_id: requesterId},
    { $set: {
      'lastModified' : timestamp,
      [`chats.${insertedId}`]: {name: insertedId.toString(), unread: 0}
    }}
  )
  const [pResult, sResult] = await Promise.all([updateParticipants, updateSender])
  
  if (!pResult.acknowledged || !sResult.acknowledged)
    throw new Error('Chat - Create: Cannot update/find participants')

  return {
    timestamp,
    chatId: insertedId,
    participantIds
  }
}

const get = async(chatId:ObjectId, userId:ObjectId) => {
  const client = await connectToDB()
  if (!client) throw new Error('Chat - Get: Database not found')
  
  const db = client.db()
  const chatCollection = db.collection('chat') as Collection<Chat>
  const userCollection = db.collection('user') as Collection<User>
  
  const chat = await chatCollection.findOne({_id: chatId})

  if (!chat) throw new Error('Chat - Get: No chat found')
  if(!chat.participants.includes(userId)) throw new Error ('Chat - Get: User not included')

  const displayNames:Record<string, string> = {}
  
  const participants = await userCollection.find({_id: {$in: chat.participants}}).toArray()  
  participants.forEach((u:User) => {
    displayNames[u._id.toString()] = u.nickname
  })
  
  return chat.history.map(h => ({
      message: h.message,
      sender: displayNames[h.sender.toString()] || 'unknown',
      timestamp: h.timestamp
  }))
}
const chat = {
  addMessage,
  create,
  get
}
export default chat
