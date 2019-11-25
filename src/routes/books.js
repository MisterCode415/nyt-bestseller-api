'use strict'

import express  from 'express'
import mongoose from 'mongoose'
import Book     from '../models/books'

const router = express.Router()

router.get('/', (req, res) => {
  let query = {} // find all

  if(req.query.q) {
    query = { title: { $regex : req.query.q, $options: 'i' } }   // search title with pattern matching
  }

  Book.find(query)
    .select('title author pubDate rank category')
    .then(docs => {
      if(!docs) {
        res.status(204).json({
          result: 'No search results'
        })
      } else {
        res.status(200).json({
          result: docs
        }) 
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    }) 
})

router.post('/', (req, res) => {
  const book = new Book({
    _id:         mongoose.Types.ObjectId(),
    title:       req.query.title,
    author:      req.query.author,
    description: req.query.description,
    pubDate:     req.query.pubDate,
    rank:        req.query.rank,
    category:    req.query.category
  });

  book.save()
      .then(result => {
        res.status(201).json({
          message: 'Resource added',
          newResource: book
        })      
      })
      .catch(err => {
        res.status(500).json({
          error: err
        }) 
      })  
})

export default router