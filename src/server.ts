import mongoose from 'mongoose'
import app from './app'

const port = process.env.PORT || 5001

const main = async () => {
  const dbConnection = await mongoose.connect(
    process.env.DATABASE_URL || 'mongodb://localhost:27017/express-mongo'
  )
  if (dbConnection) {
    console.log('Connected to database')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}

main()
