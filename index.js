import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js'
import homePageRoutes from './routes/homePage.js'
import foodPageRoutes from './routes/foodPage.js'


const app = express();

dotenv.config();
app.use(bodyParser.json(
  { limit: '30mb', extended: true }
));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/user', userRoutes)
app.use('/homePage', homePageRoutes)
app.use('/foodPage', foodPageRoutes)
app.get('/', (req, res) => {
  res.send('Hello this is HMS')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, console.log(`Server running ${PORT}`))).catch((error) => console.log(error));
onsole.log(error));
