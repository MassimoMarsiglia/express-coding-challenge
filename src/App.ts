import express from 'express';
import http from 'http';
import router from './routes/Index'

const app = express();
const port = 5000;

const server = http.createServer(app)

app.use('/', router());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };