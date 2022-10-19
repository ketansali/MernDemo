require('dotenv').config()
require('./db/conn')
const express = require('express')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const usersRoutes = require('./routes/users.routes')
const technologyRoutes = require('./routes/technology.routes')
const employeeRoutes = require('./routes/employee.routes')

app.use(cors())
app.use(express.json())
//routes
app.use('/api',usersRoutes)
app.use('/api',technologyRoutes)
app.use('/api',employeeRoutes)



//error Middleware

app.use(notFound)

app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`server is running on PORT : ${PORT}`);
})







