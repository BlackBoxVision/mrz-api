const cors = require('cors');
const Express = require('express');
const bodyParser = require('body-parser');

const app = new Express();

const apiRouter = require('./routes');

app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(5000, () => {
  console.log(
    `Servidor inicializado en el puerto 5000.  Accede desde la URL http://localhost:5000`
  );
});
