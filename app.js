const express = require('express')
const app = express();
//routes
const routerUser = require('./src/routes/users.routes');
const routerAccounts = require('./src/routes/bankAccount.routes');
const routerTransactions = require('./src/routes/transaction.routes');

const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./openApi.json')
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json({strict: false}));
app.use(morgan('dev'))

app.use('/images', express.static('./public/images'))
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use('/api/v1/users', routerUser);
app.use('/api/v1/accounts', routerAccounts);
app.use('/api/v1/transactions', routerTransactions);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal server error')
  })

module.exports = app