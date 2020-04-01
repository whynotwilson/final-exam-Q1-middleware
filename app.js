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

// middleware
const checkTimeMiddleware = function (req, res, next) {
  const start = new Date().getTime()

  showPassTime(start)

  let receiveReqTime = new Date()
  receiveReqTime = receiveReqTime.toISOString().slice(0, 10) + receiveReqTime.toString().slice(15, 25)

  console.log('reqTime |', receiveReqTime, '|', req.method, 'path from', req.route.path)
  console.log('reqTime |', receiveReqTime, '|', req.method, 'url  from', req.url)

  function showPassTime(startTime) {
    setTimeout(() => {
      let sendResTime = new Date()
      sendResTime = sendResTime.toISOString().slice(0, 10) + sendResTime.toString().slice(15, 25)
      const endTime = new Date().getTime()
      const passTime = endTime - startTime
      console.log('resTime |', sendResTime, '| total time: ', passTime, 'ms')
      console.log('')
    }, 0)
  }

  next()
}

// 列出全部 Todo
app.get('/', checkTimeMiddleware, (req, res) => {
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
