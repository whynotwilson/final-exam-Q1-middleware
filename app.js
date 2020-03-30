// 要求，設計一個 middleware ，能在終端機印出請求的 HTTP 方法，網址(url)以及時間戳記
// ex:
// 2019-5-17 18:51:12 | GET from /

const express = require('express')
const app = express()
const port = 3000

const consoleMiddleware = function (req, res, next) {
  let date = new Date()
  // console.log('toISOString', date.toISOString())
  // console.log('toDateString', date.toISOString())
  // console.log(date.toString().slice(16, 25))
  date = date.toISOString().slice(0, 10) + date.toString().slice(15, 25)
  console.log(date)
}

// 列出全部 Todo
app.get('/', consoleMiddleware, (req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log('')
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log('')
  console.log('')
  res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
