import FileHelper from "./fileHelper.js"
import { logger } from "./logger.js"
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads')
export default class routes{
        io
        constructor(downloadsFolder = defaultDownloadsFolder) {
            this.downloadsFolder = downloadsFolder
            this.fileHelper = FileHelper
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
            const files = await this.fileHelper.getFilesStatus(this.downloadsFolder)

            res.writeHead(200)
            res.end(JSON.stringify(files))
        }
        
        handler(req, res) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            const chose = this[req.method.toLowerCase()] || this.defaultRoute
            
            return chose.apply(this, [req,res])
        }
}