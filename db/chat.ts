import { ObjectId } from 'mongodb'
import Chat from './models/chat'
import User from './models/user'
import { getUserCollection, getChatCollection} from './connection'
import type {
  FindChat,
  AddMessage,
  CreateChat,
  GetChat,
  GetParticipants,
  RemoveUser,
  RemoveChat } from '../types/db/chat'

const findChat:FindChat = async(chatId: ObjectId, userId: ObjectId) => {
  const chatCollection = await getChatCollection()
  const chat = await chatCollection.findOne({_id: chatId})

  if (!chat) throw new Error('Chat - Get: No chat found')
  const cmp = chat.participants.find(p => p.equals(userId))
  if(cmp === undefined) throw new Error('Chat - Get: User not included')

  return chat 
}

const addMessage:AddMessage = async(sender:ObjectId, chatId:ObjectId, message:string) => {
   const timestamp = Date.now() 
    const userCollection = await getUserCollection()
    const senderInfo = await userCollection.findOne({_id: sender})
    if (!senderInfo) throw new Error('Chat - Add Message: Sender not found')

    const chatCollection = await getChatCollection()
    const {value} = await chatCollection.findOneAndUpdate(
      {_id:chatId}, 
      {$push: {'history': { timestamp, sender:sender.toString(), message }}
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

const create:CreateChat = async(requesterId, participants, message) => {
  const userCollection = await getUserCollection()
  const participantIds: ObjectId[] =
    (await userCollection.find({username: {$in: participants}}).toArray()).map(user => user._id)
  
  const chatCollection = await getChatCollection()
  if (!participantIds.find(id => id.equals(requesterId))) participantIds.push(requesterId)
  const timestamp = Date.now()
  const {insertedId} = await chatCollection.insertOne(
    new Chat(participantIds, [{timestamp,sender: requesterId.toString(), message}])
  )
  // Add chat reference for participants
  const updateParticipants = userCollection.updateMany(
    {_id: {$in: participantIds}},
    { $set: {
      'lastModified': timestamp,
      [`chats.${insertedId}`]: {
        name: insertedId.toString(),
        unread: 1,
        participants: participantIds
      }
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

const get:GetChat = async(chatId:ObjectId, userId:ObjectId) => {
  const chat = await findChat(chatId, userId)
  const displayNames:Record<string, string> = {}
 
  const userCollection = await getUserCollection()
  const participants = await userCollection.find({_id: {$in: chat.participants}}).toArray()  
  participants.forEach((u:User) => {
    displayNames[u._id.toString()] = u.nickname
  })
 
  return ({
    participants: participants.map(p => p.nickname),
    history: chat.history.map(h => ({
      message: h.message,
      sender: displayNames[h.sender.toString()] || 'unknown',
      timestamp: h.timestamp
    }))
  })
}

const getParticipants:GetParticipants = async(chatId:ObjectId, userId:ObjectId) => {
  const chat = await findChat(chatId, userId)
  const userCollection = await getUserCollection()
  const participants = await userCollection.find({_id: {$in: chat.participants}}).toArray()
  return participants.map(p => p.nickname)
  
}

const removeUser:RemoveUser = async(chatId: ObjectId, userId:ObjectId) => {
  const [chatCollection, userCollection] = await Promise.all([getChatCollection(), getUserCollection()])
  const [userCond, chatCond] = [{_id: userId}, {_id: chatId}]
  const [chat, user] = await Promise.all([chatCollection.findOne(chatCond), userCollection.findOne(userCond)])

  if (!chat || !user) throw new Error('Chat - RemoveUser: Chat or User not found')
  
  const index = chat.participants.findIndex(p => p.equals(userId))
  if(index === -1) throw new Error ('Chat - RemoveUser: User not included')

  delete user.chats[chatId.toString()]
  chat.participants = [
    ...chat.participants.slice(0,index),
    ...chat.participants.slice(index + 1, chat.participants.length)
  ]
  const [{acknowledged: ack1}, {acknowledged : ack2}] = await Promise.all([
    userCollection.updateOne(userCond, {$set: {chats: user.chats}}),
    chatCollection.updateOne(chatCond, {$set: {participants: chat.participants}})
  ])
  return ({
    acknowledged: ack1 && ack2
  })
}

const removeChat:RemoveChat = async(chatId, userId) => {
  const [chatCollection, userCollection] = await Promise.all([getChatCollection(), getUserCollection()])
  const [userCond, chatCond] = [{_id: userId}, {_id: chatId}]
  const [chat, user] = await Promise.all([chatCollection.findOne(chatCond), userCollection.findOne(userCond)])

  if (!chat || !user) throw new Error('Chat - RemoveUser: Chat or User not found')
  
  const index = chat.participants.findIndex(p => p.equals(userId))
  if(index === -1) throw new Error ('Chat - RemoveChat: User not included') 

  const userUpdate = userCollection.updateMany(
    { _id: {$in: chat.participants }},
    { $unset: {[`chats.${chatId}`] : '' }
  })

  const chatUpdate = chatCollection.deleteOne({_id: chatId})
  const [{acknowledged: ack1}, {acknowledged: ack2}] = await Promise.all([userUpdate, chatUpdate])
  return ({
    acknowledged: ack1 && ack2,
    chatId: chat._id,
    participants: chat.participants
  })
}

const chat = {
  addMessage,
  create,
  get,
  getParticipants,
  removeUser,
  removeChat
}
export default chat
