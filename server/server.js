const express = require('express');
const app = express();
// const cors = require('cors');
// const cors_proxy = require('cors-anywhere');
const path = require('path');
const authRouter = require('./routers/auth-router');
const searchRouter = require('./routers/search-router');

const PORT = process.env.PORT || 3000;

// app.use(cors({ credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/users', authRouter);
app.use('/politicians', searchRouter);

//ERROR HANDLING
app.use((err, req, res, next) => {
  const error = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      err: 'A server error occured',
    },
  };
  error.message = err.message;
  if (err.status) error.status = err.status;

  console.log('SERVER ERROR: ', error.message);
  res.status(error.status).send(error.message);
});

app.listen(PORT, () => console.log(`App is running on ${PORT}... `));