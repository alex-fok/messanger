import 'dotenv/config'
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'
import { Server } from 'socket.io'
import socket from '../socket/server'
const nextApp = next({dev: true})
const nextHandler = nextApp.getRequestHandler()
nextApp.prepare().then(async () => {
  const port = parseInt(process.env.PORT || '3000', 10)
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    nextHandler(req, res, parsedUrl)
  })
  const io = new Server(server)
  socket(io)
  server.listen(port)
})
