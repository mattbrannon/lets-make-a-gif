const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { cookieSetter, ensureDirectories } = require('./middleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cookieSetter);
app.use(ensureDirectories);

app.use(express.static(path.join(__dirname, '../build')));

require('./routes/upload-images')(app);
require('./routes/upload-image')(app);
require('./routes/upload-videos')(app);
require('./routes/upload-filters')(app);
require('./routes/reset-filters')(app);
require('./routes/download')(app);
require('./routes/404')(app);
require('./routes/default')(app);

if (process.env.NODE_ENV !== 'production') {
  console.log('app running in development mode');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
else {
  app.listen(PORT);
}
