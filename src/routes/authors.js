'use strict'

import express from 'express'

const router = express.Router()
router.get('/', (req, res) => {
  // stub
  res.status(200).json({
    result: 'fetch authors'
  })
})

export default router