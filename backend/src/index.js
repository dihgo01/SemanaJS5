import fs from 'fs'
import { Server } from 'http'
import https from 'https'
import logger from './logger.js'
import { Server } from 'socket.io'


const PORT = process.env.PORT || 3000

const localHostSSL = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('./certificates/cert.pem')
}


const server = https.createServer(
    localHostSSL,
    (req, res) => {
        res.end('hello world')
    }
)

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: false
    }
})

io.on("connection", (socket) => logger.info(`someone connected:${socket.id}`))

const startServer = () => {
    const { address, port } = server.address()
    logger.info(`app running at https://${address}:${port}`)
}