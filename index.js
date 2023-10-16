const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./openApi.json')

const routerUser = require('./src/users/userController');
const routerAccounts = require('./src/bankAccounts/accountController');
const routerTransactions = require('./src/transactions/transactionController')
// const routerAcc = require('./routers/accounts/accountsRouter')
// const hostname = '127.0.0.1';

app.use(express.json({strict: false}));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson))


app.use('/api/v1/users', routerUser);
app.use('/api/v1/accounts', routerAccounts);
app.use('/api/v1/transactions', routerTransactions);
// app.use('/api/v1', routerAcc);

app.listen(PORT, ()=>{
    console.log(`Server is listening at port http://localhost:${PORT}`);
})