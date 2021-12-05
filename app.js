// Tạo server đầu tiên

const http = require('http')

// Tạo ra 1 biến để lưu trữ server // vế sau là đã khởi tạo 1 serer
const server = http.createServer((req, res) => {
    console.log(req)
})
// MỞ Port cho SERVER // con số 3000 có thể thay đổi mặc định sẽ là 

server.listen(3000)
