'use strict'

import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  // stub
  res.status(200).json({
    result: 'fetch books'
  }) 
})

router.post('/', (req, res) => {
  // stub
  res.status(201).json({
    result: 'book resource added'
  })  
})

export default router