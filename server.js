const express = require('express')
const app = express()
const port = 3000

const mid1 = (request, response, next) => {
    const errObj = new Error('hey this is error')
    // next(errObj)
    console.log('i have error but i think i can just pass')

    //variables saved in one function communicates and get transferred to another middleware being invoked. 
    request.customProperty = 100
    console.log('initially i am ' + request.customProperty)
    next()
}

const mid2 = (request, response, next) => {
    console.log(`I am mid2 but the customProperty is still ${request.customProperty}`)
    request.customProperty = parseInt(request.customProperty) + 100
    console.log(`I am still in mid2 and the customProperty is now ${request.customProperty}`)
    next()
}

const errHandler = (error, request, response, next) => {
    if (error) {
        response.send('hello error')
    }
}

const errHandler2 = (error, request, response, next) => {
    response.send(error)
}

//order in which the middleware being called matters because it will create bad stack messages if the error handler is not being put afterwards. 
//and the reason errhandler is at the end of this whole enterprise is that we want to catch at which step of the middleware this error occurs. 

app.use(mid1) 
app.use(mid2) 
// the above combination will give out {} on the browser



app.get('/', (req, res, next) => {
    res.send("<h1>hello world</h1>")
})


//if errhandler comes before mid1, then it will shoot out error message on the browser
//which is dangerous because there's potential of exposing critical info to bystanders. 

app.listen(port, () => {
    console.log(`listening to ${port}`)
})