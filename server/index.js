import express from 'express'
import {config} from './config.js'
import mongoose from 'mongoose'
import cors from 'cors';
import {router as userRouter} from './routers/user.js'

const app = express()

mongoose.connect(config.dbPath)

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})

app.listen(config.http.port, () => {
    console.log('Server has started')
})
