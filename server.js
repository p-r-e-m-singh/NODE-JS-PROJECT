const fs = require('fs')
const http = require('http')
const URL = require('url')
const db = require('./dbcon/dbconnection')
const server = http.createServer((req, res) => {
    const reqURL = URL.parse(req.url, true)
    const pathname = reqURL.pathname
    if (req.method === "GET" && (pathname === "/" || pathname === "/home")) {
        fs.readFile("./public/index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            }
        })
    }
    if (req.method === "GET" && pathname === "/registration") {
        fs.readFile("./public/registration.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            }
        })
    }
    if (req.method === "GET" && pathname === "/login") {
        fs.readFile("./public/login.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            }
        })
    }
    if (req.method === "GET" && pathname === "/loggedin") {
        fs.readFile("./public/loggeding.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            }
        })
    }
    if (req.method === "GET" && pathname === "/failed") {
        fs.readFile("./public/failed.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            }
        })
    }
    if (req.method === "POST" && pathname === "/registration") {
        let body = ""
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            const formData = new URLSearchParams(body)
            console.log(formData)
            const name = formData.get('typeNameX')
            const email = formData.get('typeEmailX')
            const password = formData.get('typePasswordX')
            const SQL = `INSERT INTO users(uname,email,password) VALUES("${name}", "${email}", "${password}")`
            db.query(SQL, (err, data) => {
                if (err) {
                    console.log("Error inserting values inside tha table", err)
                    res.writeHead(500)
                    res.end("Error inserting the value")
                } else {
                    console.log("Data inserted Successfully")
                    res.writeHead(302, {
                        'Location': '/home'
                    })
                    res.end()
                }
            })
        })
    }
    if (req.method === "POST" && pathname === "/check-username") {
        let body = ""
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            const formData = JSON.parse(body)
            const uname = formData.username
            // console.log(uname)
            if (uname == null) {
                console.log(formData.username)
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify({
                    success: false,
                    message: 'Error checking username availability'
                }))
            } else {
                db.query(`select count(*) as count from users where uname = "${uname}"`, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        res.end(JSON.stringify({
                            success: false,
                            message: 'Error checking username availability'
                        }))
                    } else {
                        const count = result[0].count;
                        if (count > 0) {
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
                            res.end(JSON.stringify({
                                success: false,
                                message: 'Username Is Already Taken'
                            }))
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
                            res.end(JSON.stringify({
                                success: true,
                                message: 'Username is available'
                            }))
                        }
                    }
                })
            }
        })
    }
    if (req.method === "POST" && pathname === "/login") {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            const formData = new URLSearchParams(body)
            const name = formData.get('typeNameX')
            const password = formData.get('typePasswordX')
            const SQL = `SELECT * FROM users WHERE uname = '${name}' AND password = '${password}'`
            db.query(SQL, (err, result) => {
                if (err) {
                    console.log('Error during login', err)
                    res.writeHead(500)
                    res.end('An error occurred during login')
                } else {
                    if (result.length > 0) {
                        console.log('Logged in Successfully')
                        res.writeHead(302, {
                            'Location': '/loggedin'
                        })
                        res.end()
                    } else {
                        console.log('Invalid User')
                        res.writeHead(302, {
                            'location': '/failed'
                        })
                        res.end()
                    }
                }
            })
        })
    }
})
server.listen(3000, (err) => {
    if (err) console.log("error")
    else console.log("running in 3000")
})