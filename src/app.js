'use strict'

import 'dotenv/config' // config data found in .env
import express     from 'express'
import cors        from 'cors' // cross domain middleware fix pass in headers
import morgan      from 'morgan' // causes a deprecated warning, can use require but letting it slide for now for consistency
import mongoose    from 'mongoose'
import books       from './routes/books'
import authors     from './routes/authors'
import pathErrors  from './routes/errors'
import appErrors   from './errors'

// kill server if database is offline
mongoose.connect(process.env.CONNECTION_STRING, function(err) {
  if(err) {
    throw err
    process.exit(0)
  }
})

// entrypoint
const app = express()
const router = express.Router()

// vebose logging
app.use(morgan('dev'))
// cross origin security fix
app.use(cors()) 
// parse request bodies as json and make available by callee
app.use(express.json())
// parse url queries and make available by the callee
app.use(express.urlencoded({extended:true}))

// routing paths w/ forwarding
app.use('/books',   books)
app.use('/authors', authors)

// catch all other requests, not sure if this is the best way...
app.all('/*', pathErrors) // is a wildcard the best method to catch all unhanlded paths? Not sure
app.use(appErrors) // final error reporting + catch all


// port defined in .env file
app.listen(process.env.PORT, ()=>console.log(`port ${process.env.PORT}`))

export default app