// Tạo server đầu tiên

const http = require('http')

// Tạo ra 1 biến để lưu trữ server // vế sau là đã khởi tạo 1 serer
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)
    // res gửi phản hồi
    res.setHeader('Content-Type', 'text/html')
    res.write("<html>")
    res.write("<header><title>My First Page</title></header>")
    res.write("<body><h1>Hello from my Node.js server!</h1></body>")
    res.write("</html>")
    res.end()

})

// MỞ Port cho SERVER // con số 3000 có thể thay đổi mặc định sẽ là http://localhost:3000/
server.listen(3000)
