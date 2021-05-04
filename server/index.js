const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

require('./routes/upload-images')(app);
require('./routes/upload-video')(app);
require('./routes/download')(app);
require('./routes/default')(app);

app.listen(PORT);
