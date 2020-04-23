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
  const startHrTime = process.hrtime()

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
    console.log('%s : %fms', req.path, elapsedTimeInMs)
  })

  next()
  // req.requestTime = new Date()
  // req.requestTime = req.requestTime.toISOString().slice(0, 10) + req.requestTime.toString().slice(15, 25)
  // console.log('reqTime |', req.requestTime, '|', req.method, 'path from', req.route.path)
  // next()
}

app.use(checkTimeMiddleware)

// 列出全部 Todo
app.get('/', (req, res) => {
  for (let i = 1; i < 100000; i++) {
    
  }
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/todos/', (req, res) => {
  res.send('新增一筆  Todo')
})

// 刪除一筆 Todo
app.delete('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
