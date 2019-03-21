'use strict'

const glob = require('glob')

// options is optional
glob("2019/*.md", function (er, files) {
  console.log(files)
})
