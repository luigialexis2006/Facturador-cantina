const express = require('express'); //permite crear servidores web de una forma simple jsjsjs
const bodyParser = require('body-parser'); //interpreta el cuerpo de las peticiones http como datos enviados como un formulario o como archivo .json
const cors = require('cors'); //Nos ayuda a consumir el backend en un puerto

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Rutas
const mesasRouter = require('./routes/mesas');
const productosRouter = require('./routes/productos');
app.use('/api/mesas', mesasRouter);
app.use('/api/productos', productosRouter);

const PORT = 5000;

app.listen(PORT, () => console.log('Backend escuchando en http://localhost:${PORT}'))
