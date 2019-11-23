'use strict'

import express from 'express'
const router = express.Router()

// catch all bad paths and forward 
router.all('/*', (req, res, next) => {
  var error = new Error('path not found')
  error.status = 404;
  next(error)
})

export default router