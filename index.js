import express from 'express';


const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello from Checkinator\'s powerful server</h1>');
});

const startServer = () => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
};

startServer();
