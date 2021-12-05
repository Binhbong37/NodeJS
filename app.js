
const http = require('http')

const server = http.createServer((req, res) => {
    // video 32: Routing request
    const url = req.url;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write("<html>")
        res.write("<header><title>My First Page</title></header>")
        res.write(`<body><form action='/message' method='POST'>
        <input type = 'text' name='message'> <button type='submit'>Send</button>
        </form></body>`)
        res.write("</html>")
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html')
    res.write("<html>")
    res.write("<header><title>My First Page</title></header>")
    res.write("<body><h1>Hello from my Node.js server!</h1></body>")
    res.write("</html>")
    res.end()

})

server.listen(3000)
