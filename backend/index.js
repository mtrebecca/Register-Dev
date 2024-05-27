const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

const niveisRouter = require('./routes/niveis');
const desenvolvedoresRouter = require('./routes/desenvolvedores');
const desenvolvedoresNiveisRouter = require('./routes/desenvolvedoresNiveis');

app.use('/api/niveis', niveisRouter);
app.use('/api/desenvolvedores', desenvolvedoresRouter);
app.use('/api/desenvolvedoresNiveis', desenvolvedoresNiveisRouter);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
