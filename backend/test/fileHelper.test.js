import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../src/fileHelper'


describe('#File Helper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () =>{
            const statMock = {
                    dev: 571004547,
                    mode: 33206,
                    nlink: 1,
                    uid: 0,
                    gid: 0,
                    rdev: 0,
                    blksize: 4096,
                    ino: 1970324838925535,
                    size: 806361,
                    blocks: 1576,
                    atimeMs: 1631190522461.5515,
                    mtimeMs: 1601480462000,
                    ctimeMs: 1625662539534.9336,
                    birthtimeMs: 1631190516610.511,
                    atime: '2021-09-09T12:28:42.462Z',
                    mtime: '2020-09-30T15:41:02.000Z',
                    ctime: '2021-07-07T12:55:39.535Z',
                    birthtime: '2021-09-09T12:28:36.611Z'
                  }
            const mockUser = 'diego'
            process.env.USER = mockUser
            const filename = 'file.jpg' 

            jest.spyOn(fs.promises, fs.promises.readdir.name)
            .mockResolvedValue([filename]) 
        
            jest.spyOn(fs.promises, fs.promises.stat.name)
            .mockResolvedValue(statMock) 
            const result = await FileHelper.getFilesStatus('/tmp')
        
            const expectResult = [
                {
                    size: "806 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectResult)
        })
    })
})