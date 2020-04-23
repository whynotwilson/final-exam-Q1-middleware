// middleware 實作，設計一個 middleware ，能在終端機印出請求的 HTTP 方法，網址(url)以及時間戳記
// ex:
// 2019-5-17 18:51:12 | GET from /

// 進階題：留下兩次時間戳記，兩次的戳記分別需為：
// (1) 收到請求 (request)，以及(2) 送出回應 (response) 的時間。
// ex:
// 2019-5-17 18:51:12 | GET from /
// 2019-5-17 18:51:12 | GET from / | total time: 8ms

const express = require('express')
const app = express()
const port = 3000

var checkTimeMiddleware = function (req, res, next) {
  req.reqTime = new Date()
  req.reqLocalTime = req.reqTime.toLocaleTimeString()

  console.log('reqTime |', req.reqLocalTime, '|', req.method, 'path from', req.route.path)

  res.on('finish', () => {
    const resTime = new Date()
    const resLocalTime = resTime.toLocaleTimeString()

    console.log('resTime |', resLocalTime, '| total time: ', (resTime - req.reqTime).toLocaleString(), 'ms')
    console.log('')
  })

  next()
}

// 列出全部 Todo
app.get('/', checkTimeMiddleware, (req, res) => {
  // for (let i = 1; i < 1000000000; i++) {

  // }
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/todos/new', checkTimeMiddleware, (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', checkTimeMiddleware, (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/todos/', checkTimeMiddleware, (req, res) => {
  res.send('新增一筆  Todo')
})

// 刪除一筆 Todo
app.delete('/todos/:id/delete', checkTimeMiddleware, (req, res) => {
  res.send('刪除 Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
