// Video 38: 

const fs = require('fs')
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method
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
    
    if(url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        });
        // Video 35:
        // Video 36:
        return req.on('end',() => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            });
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write("<html>")
    res.write("<header><title>My First Page</title></header>")
    res.write("<body><h1>Hello from my Node.js server!</h1></body>")
    res.write("</html>")
    res.end()
}
//  xuat ra ngoai de file khac dung lai duoc
// cah 1
module.exports = {
    handler:requestHandler,
    someText:"Some hard coded text"
}
// cach 2:
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text"

// Cach 3:
// exports.handler = requestHandler;
// exports.someText = "Some hard coded text"

// Cach nua
// module.exports = requestHandler