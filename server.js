const express = require('express');
const route = require('./routes');


const app = express();
const localhost = 8080

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(route)

app.listen(localhost,()=>{console.log("Servidor en linea en el puerto: "+localhost);})