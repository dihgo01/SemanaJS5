import fs from 'fs'
import prettyBytes from 'pretty-bytes'

export default class FileHelper {
    
    static async getFilesStatus(downloadFolder) {
        const currentFiles = await fs.promises.readdir(downloadFolder)
        const statuses = await Promise.all(currentFiles.map(file => fs.promises.stat(`${downloadFolder}/${file}`)))

        const filesStatuses = []

        for( const fileIndex in currentFiles) {
            const { birthtime , size } =statuses[fileIndex]
            filesStatuses.push({
                size: prettyBytes(size),
                file: currentFiles[fileIndex],
                lastModified: birthtime,
                owner: process.env.USER
            })
            
        }

        return filesStatuses
    
    }

}