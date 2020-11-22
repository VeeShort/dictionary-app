const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));

// register routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/dictionary', require('./routes/dictionary.routes'));

if (process.env.NODE_ENV === 'production') {
  // form static folder
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  // this will make BE and FE work in parallel
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// connect to DB
async function connectDB() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}!`));
  } catch (error) {
    console.error('Server Error', error.message);
    process.exit(1);
  }
}

connectDB();
