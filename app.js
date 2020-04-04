const express = require('express')
const app = express()
const port = 3000

// for req timestamp
let time = require('express-timestamp')
app.use(time.init)

let getReqInfo = function (req, res, next) {

  let moment = req.timestamp.format()
  let array = moment.split('')
  let time = ''
  let date = array.splice(array.indexOf('T'), 1, ' ')
  let zone = array.splice(array.indexOf('+'), 6)
  array.forEach(item => {
    time += item
  })

  req._startTime = new Date() // 請求時間
  // console.log(req._startTime)
  function responseTime() {
    let now = new Date()
    // console.log(now)
    let totalTime = now - req._startTime
    // console.log(totalTime)
    console.log(`${time}| ${req.method} from ${req.url} | totalTime: ${totalTime} `)
  }
  res.once('finish', responseTime)
  res.once('close', responseTime)
  return next()
}

app.use(getReqInfo)

// 列出全部 Todo
app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
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

