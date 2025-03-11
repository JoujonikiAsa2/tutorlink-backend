import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'

dotenv.config()

const app: Express = express()

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }))
app.use(cookieParser())
app.use(express.json())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Application running successfully')
})


app.use((req: Request, res: Response) => {
  res.status(404).json({  
    success: false,
    message: 'Page not found'
  })
})

export default app
