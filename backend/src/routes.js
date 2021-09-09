import { logger } from "./logger.js"
export default class routes{
        io
        constructor() {

        }
        setSocketInstance(io) {
            this.io = io
        }
        async defaultRoute(req, res) {
             res.end("That url doesn't exist yet!")
        }
        async options(req, res) {
            res.writeHead(204)
            res.end("That url doesn't exist yet!")
        }
        async post(req, res) {
            logger.info("post")
            res.end()
        }
        async get(req, res) {
            logger.info("get")
            res.end()
        }
        
        handler(req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            const chose = this[req.method.toLowerCase()] || this.defaultRoute
            
            return chose.apply(this, [req,res])
        }
}