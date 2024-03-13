const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConnection = require('./Utils/connection');
const mainRouter = require('./routes/index.routes');
const { MONGOD_URI } = require('./main.config');
const cors = require('cors');

const errorMiddleware = require('./middleware/error-handler');
const PORT = process.env.PORT || 5500;

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));

dbConnection(MONGOD_URI);

app.use('/api', mainRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`host on port ${PORT}`));
