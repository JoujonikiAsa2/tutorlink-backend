import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }))
app.use(cookieParser())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Application running successfully')
})

export default app
