const express = require('express')
const router = express.Router()
const ncp = require("copy-paste");

const shortenURL = require('../../models/shortenURL')  //引入Schema
const generateURL = require('../../generate_url')  //引入URL演算法

router.get('/', (req, res) => {
    return res.render('index')
})

router.post('/', (req, res) => {

    const original_url = req.body.url  //input的name是url
    //const shortened_url = generateURL()
    const error = 'Please enter a valid URL'

    //如果輸入的值是空的, 跳出提示訊息
    if (!original_url) {
        return res.render('index', { error })
    } else {

        return shortenURL.findOne({ original_url })  //從資料庫裡尋找現有的資料
            .lean()
            .then(url => {  //已經縮好的網址
                let shortened_url
                if (url) {
                    shortened_url = url.shortened_url
                    // console.log(url)
                    // console.log(shortened_url)
                    return res.render('index', { shortened_url, original_url})
                } else {
                    shortened_url = generateURL()
                    shortenURL.create({ original_url, shortened_url })
                    return res.render('index', { shortened_url, original_url })
                }
            })
            .catch(error => console.log(error))
    }

})

router.get("/:shortURL", (req, res) => {
    const shortened_url = req.params.shortURL
    //console.log(shortened_url)
    shortenURL.findOne({shortened_url:`http://localhost:3000/` + shortened_url})
   
    .then(url => 
        { 
            //console.log(url)
            res.redirect(url.original_url)
        }
        )
  })

module.exports = router

