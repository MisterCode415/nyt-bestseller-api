'use strict'

import express from 'express'

const router = express.Router()
router.get('/', (req, res) => {
  // using distinct is a timely way to handle list of authors. 
  // improvement would be to use $aggregate to match
  // criteria against book description and author fields, etc
  Books.distinct('author') 
    .exec()
    .then(documents => {
      if(!documents) {
        res.status(204).json({
          result: 'no results found'
        })  
      }
      res.status(200).json({
        result: documents
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      }) 
    })
})

export default router