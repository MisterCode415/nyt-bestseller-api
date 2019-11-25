'use strict'

import config   from 'dotenv/config'
import cheerio  from 'cheerio'
import axios    from 'axios'
import mongoose from 'mongoose'
import Book     from '../models/books'

const log = console.log // i like this shortcut

const scrapeUrl = 'https://www.nytimes.com/books/best-sellers/'

const crawl = ($) => {
  let books = []
  // this is a reasonable outer anchor per
  const baseSelector = '[itemscope] div section'
  const categoryList = $(baseSelector)

  $(categoryList).each((i, categoryData)=>{
    // capture category name each iteration
    const categoryName = $(categoryData).children().first().get(0).attribs.id
    
    // this is a reasonable inner anchor that will grab iterable list
    let dataBlockOuter = $(categoryData).children().first().next().find('ol > li')

    dataBlockOuter.each((j, blockData) => {
      let fieldData = blockData.children[0].children[1].children

      // aggressive way to extraxt the strings but we're moving fast here
      const pubDate     = $(fieldData[0]).text()
      const title       = $(fieldData[1]).text()
      const author      = $(fieldData[2]).text()
      const description = $(fieldData[3]).text()

      books.push(new Book({
        _id: mongoose.Types.ObjectId(),
        title:       title,
        author:      author,
        pubDate:     pubDate,
        description: description,
        rank:        j+1,
        category:    categoryName
      }))

    })
  })
  
  // dont wipe data unless there is replacement data:
  // this is hard coded but a reasonable expectation for this bestseller page.  
  // layout may change in the future. in which case the script may need to revisit the parsing.
  // the sub pages contain more bestsellers per category, 15 I think, but were trying to get this done fast
  // next crawler feature would be crawl subsequent pages and get more ranked entries
  if(books.length >= 50) { 
    removeAll(books)
  }
}

const save = (books) => {
  // we could also use the POST in the service to do this but we don't need to
  Book.collection.insertMany(books, (err, docs) => {
    err ? console.error(err) : console.log("Bestsellers list updated")
    process.exit();
  })
}

const removeAll = (books) => {
  Book.deleteMany({}, (err, data) => {
    err ? console.log(err) : save(books)  
  })
}

const load = async () => {
  const result = await axios.get(scrapeUrl)
  return cheerio.load(result.data)
}

const init = () => {
  mongoose.connect(process.env.CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err) {
    if(err) {
      throw err
      process.exit(0)
    }
  })
  load().then(($)=>{
    crawl($)
  })
}


init()