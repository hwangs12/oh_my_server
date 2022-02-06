const express = require('express')
const app = express()
const port = 3000

const mid1 = (request, response, next) => {
    const errObj = new Error('hey this is error')
    next(errObj)
}

const errHandler = (error, request, response, next) => {
    if (error) {
        response.send('hello girl')
    }
}

//order in which the middleware being called matters because it will create bad stack messages if the error handler is not being put afterwards. 
//and the reason errhandler is at the end of this whole enterprise is that we want to catch at which step of the middleware this error occurs. 

app.use(errHandler) 
app.use(mid1) 

app.get('/', (req, res, next) => {
    res.send("<h1>hello world</h1>")
})


//if errhandler comes before mid1, then it will shoot out error message on the browser
//which is dangerous because there's potential of exposing critical info to bystanders. 

app.listen(port, () => {
    console.log(`listening to ${port}`)
})