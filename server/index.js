const path = require('path');
const PORT = process.env.PORT || 5000;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
