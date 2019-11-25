# nyt-bestseller-api

NYT Bestseller API and dataminer. The service will provide endpoints to consume book lists and unique authors


Download & Install
---
git clone git@github.com:brianvegan/nyt-bestseller-api.git
npm install


Run API server
---
dev: npm start
prod: node -r esm src/app


Scrape data and update books
---
node -r esm src/tools/scrape.js
