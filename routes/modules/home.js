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
            if (url) {
                // console.log(url)
                return res.render('index', { newurl: url.shortened_url, originalurl: original_url })
            } else {
                const shortened_url = generateURL()
                shortenURL.create({ original_url, shortened_url })  //建立新的縮網址
                .then( newUrl => {
                     res.render('index', { url: newUrl, originalurl: original_url })
                })
            }
        })
        .catch(error => console.log(error))
    }

})

router.post('/copy', (req, res) => {
    //console.log(req.body.input)
    ncp.copy(req.body.input, function () {
        console.log('copy link')
    })
})


router.get('/:data', (req, res) => {
    const data = req.params.data
    //console.log(data)
    shortenURL.findOne({ shortened_url: `localhost:3000/${data}` })
        .lean()
        .then(newUrl => res.redirect(newUrl.original_url))
})

module.exports = router

//target:
//輸入相同網址時，產生一樣的縮址 v
//若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者 v
//是否可以成功使用短網址連向原始網站 v
//短網址格式是否為 5 組英數亂碼 v
//challenge: 使用者可以按 Copy 來複製縮短後的網址 v