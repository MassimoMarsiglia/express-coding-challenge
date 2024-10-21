import express from 'express';
import http from 'http';
import router from './routes/Index'
import dotenv from 'dotenv'


dotenv.config();
const app = express();
const port = process.env.PORT;

const server = http.createServer(app)

app.use('/', router());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };