import * as dotenv from 'dotenv' 
dotenv.config()

export const config = {
    dbPath : process.env.DB_ADDRESS,
    jwtSecret : process.env.SECRET_KEY,

    http : {
        port : process.env.PORT
    }
}