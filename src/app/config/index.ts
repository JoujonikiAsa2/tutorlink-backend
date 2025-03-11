import dotenv from 'dotenv';
import path from 'path';
import { cwd } from 'process';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/express-mongo'
}