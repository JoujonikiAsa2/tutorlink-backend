import dotenv from 'dotenv';
import path from 'path';
import { cwd } from 'process';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    NODE_ENV:process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/express-mongo',
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  
}