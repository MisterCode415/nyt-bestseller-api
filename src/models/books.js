'use strict'

import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
  _id :        mongoose.Schema.Types.ObjectId,
  title :      { type: String, required: true },
  author:      { type: String, required: true },
  description: { type: String, required: true },
  pubDate:     { type: String, required: true },
  rank:        { type: Number, required: true },
  category:    { type: String, required: true }
})

export default mongoose.model('Book', bookSchema)