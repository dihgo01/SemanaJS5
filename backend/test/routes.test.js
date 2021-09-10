import { describe, test, expect, jest } from '@jest/globals'
import Routes from '../src/routes'

describe('#Routes test suite', () => {

    describe('#setSocket should store io instance', () => {
        test('setSocket should store io instance', () =>{
            const routes = new Routes()
            const ioObj = {
                to: (id) => ioObj,
                emit: (event, message) => {}
            }
            routes.setSocketInstance(ioObj)
            expect(routes.io).toStrictEqual(ioObj)
        })
    
    })

    describe('#handler', () => {
        const defaultParams = {
            req: {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                method: '',
                body: {}
            },
            res: {
                setHeader: jest.fn(),
                writeHead : jest.fn(),
                end : jest.fn()
            },
            values: () => Object.values(defaultParams)
        }

        test('given an inexistent route it should choose default route',async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.req.method = 'inexistent'
            await routes.handler(...params.values())
            expect(params.res.end).toHaveBeenCalledWith("That url doesn't exist yet!")
        })

        test('it should set any resquest with CORS enabled',async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.req.method = 'inexistent'
            routes.handler(...params.values())
            expect(params.res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*")
        })

        test('given method  OPTIONS it should choose options route',async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.req.method = 'OPTIONS'
            await routes.handler(...params.values())
            expect(params.res.writeHead).toHaveBeenCalledWith(204)
            expect(params.res.end).toHaveBeenCalled()
        })

       /* test('given method  POST it should choose post route',async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.req.method = 'POST'
            jest.spyOn(routes , routes.post.name).mockRejectedValue()

            await routes.handler(...params.values())
            expect(routes.post).toHaveBeenCalled()
            expect(params.res.end).toHaveBeenCalled()
        })

        test('given method  GET it should choose get route',async() => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.req.method = 'GET'
            jest.spyOn(routes , routes.get.name).mockRejectedValue()

            await routes.handler(...params.values())
            expect(routes.get).toHaveBeenCalled()
            expect(params.res.end).toHaveBeenCalled()
        })*/
    })
    
    describe('#get', () => {

        const defaultParams = {
            req: {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                method: '',
                body: {}
            },
            res: {
                setHeader: jest.fn(),
                writeHead : jest.fn(),
                end : jest.fn()
            },
            values: () => Object.values(defaultParams)
        }

        test('given method GET it should list all files downloaded', async () =>{
           
            const routes = new Routes()

            const params = {
                ...defaultParams
            }

            const filesStatusMock = [
                {
                    size: "806 kB",
                    lastModified: '2021-09-09T12:28:36.611Z',
                    owner: 'diego',
                    file: 'file.txt'
                }
            ]

            jest.spyOn(routes.fileHelper, routes.fileHelper.getFilesStatus.name)
            .mockResolvedValue(filesStatusMock)

            params.req.method = 'GET'
            await routes.handler(...params.values())
            expect(params.res.writeHead).toHaveBeenCalledWith(200)
            expect(params.res.end).toHaveBeenCalledWith(JSON.stringify(filesStatusMock))

        })
    })
})