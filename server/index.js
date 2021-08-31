const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { cookieSetter } = require('./middleware/cookies');
const { ensureDirectories } = require('./middleware/filesystem');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cookieSetter);
app.use(ensureDirectories);
// app.use(localVariables);

app.use(express.static(path.join(__dirname, '../build')));

// require('./routes/test')(app);

require('./routes/upload-images')(app);
require('./routes/upload-image')(app);
require('./routes/upload-videos')(app);
require('./routes/upload-filters')(app);
require('./routes/reset-filters')(app);
require('./routes/download')(app);
require('./routes/default')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
