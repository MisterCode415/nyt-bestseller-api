'use strict'

import express from 'express'
const router = express.Router()
// Not required but its polite to describe the service
router.get('/', (req, res, next) => {
  return res.status(200).json({service:[
    {
      url: '/books',
      description: 'return list of books on the bestseller list'
    },
    {
      url: '/books?q=query',
      description: 'search for matches on the title by string'
    },
    {
      url: '/authors',
      description: 'returns a distinct set of authors on the bestsellers list'
    }
  ]})
})

export default router