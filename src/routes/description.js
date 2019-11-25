'use strict'

import express from 'express'

const router = express.Router()
// Not required but its polite to describe the service
router.get('/', (req, res, next) => {
  return res.status(200).json({service:[
    {
      url: '/books',
      method: 'GET',
      description: 'return list of books on the bestseller list'
    },
    {
      url: '/books',
      method: 'POST',
      description: 'save a new book to the bestseller list',
      parameters: [
        {title :      { type: String, required: true }},
        {author:      { type: String, required: true }},
        {description: { type: String, required: true }},
        {pubDate:     { type: String, required: true }},
        {rank:        { type: Number, required: true }},
        {category:    { type: String, required: true }}
      ]
    },
    {
      url: '/books?q=query',
      method: 'GET',
      description: 'search for matches on the title by string'
    },
    {
      url: '/authors',
      method: 'GET',
      description: 'returns a distinct set of authors on the bestsellers list'
    }
  ]})
})

export default router