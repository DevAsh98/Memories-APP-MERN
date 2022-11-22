import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();  //initilizing the app
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true})); //limiting the file size
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postRoutes); //resgistering the routes posts

app.use('/user', userRoutes);  //registering the routes for users who log in manually not using google

  //don't forget to use cors after the routes


const PORT = process.env.PORT || 5000;

//connecting to MDB
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, () => console.log(`server running on ${PORT}`)))
.catch ((err)=> console.log(err));

// mongoose.set('useFindAndModify', false);