// 要求，設計一個 middleware ，能在終端機印出請求的 HTTP 方法，網址(url)以及時間戳記
// ex:
// 2019-5-17 18:51:12 | GET from /

const express = require('express')
const app = express()
const port = 3000

// middleware
const checkTimeMiddleware = function (req, res, next) {
  const start = new Date().getTime()
  function showPassTime(startTime) {
    setTimeout(() => {
      let sendResTime = new Date()
      sendResTime = sendResTime.toISOString().slice(0, 10) + sendResTime.toString().slice(15, 25)
      let endTime = new Date().getTime()
      let passTime = endTime - startTime
      console.log('res', 'resTime', sendResTime, '| total time: ', passTime, 'ms')
    }, 0)
  }
  showPassTime(start)

  let receiveReqTime = new Date()
  let checkUrl = ''
  // console.log('toISOString', receiveReqTime.toISOString())
  // console.log('toDateString', receiveReqTime.toISOString())
  // console.log(receiveReqTime.toString().slice(16, 25))
  receiveReqTime = receiveReqTime.toISOString().slice(0, 10) + receiveReqTime.toString().slice(15, 25)
  checkUrl += req.rawHeaders.filter(item => {
    if (item.includes('http')) { return true }
  })

  console.log('req', 'reqTime', receiveReqTime, '|', req.method, 'from', checkUrl)

  next()
}

// 列出全部 Todo
app.get('/', checkTimeMiddleware, (req, res) => {
  res.send('列出全部 Todo')
  console.log('列出全部 Todo res後')
})

// 新增一筆 Todo 頁面
app.get('/new', checkTimeMiddleware, (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', checkTimeMiddleware, (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/', checkTimeMiddleware, (req, res) => {
  res.send('新增一筆  Todo')
})

app.delete('/:id/delete', checkTimeMiddleware, (req, res) => {
  res.send('刪除 Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
