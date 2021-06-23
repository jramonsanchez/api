const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

//Coneccioón de Mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados'
});

//ROUTE

//GET
app.get('/api/get', (req, res)=> {
    const sql = 'SELECT * FROM empleados WHERE id = 2';
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.sendStatus(204);
        }
    });

});

//POST (num1, num2 por body)
app.post('/api/post', (req, res)=> {
    const numeros = {
        num1: req.body.num1,
        num2: req.body.num2
    }
    var num1 = parseFloat(numeros.num1);
    var num2 = parseFloat(numeros.num2);
    if (isNaN(num1) || isNaN(num2)) {  
        res.status(400).send('Es necesarios introducir dos números válidos'); 
      } else {    
        res.status(200).json({
            Suma: (num1)+(num2),
            Resta: (num1)-(num2),
            División: (num1)/(num2),
            Multiplicación: (num1)*(num2),
            Residuo: (num1)%(num2)
          });
      }  
});

//PUT (param1 , param2 por parametro)
app.put('/api/put/:param1/:param2', (req, res)=> {
    const {param1, param2} = req.params;
    if (isNaN(parseFloat(param1)) && isNaN(parseFloat(param2))) {
        var palabra = [ param1 , param2 ];
        res.status(200).send(palabra.join( " " ));
    } else {
        res.status(400).send('Es necesarios introducir dos cadenas válidas');
    }

});

// Revisar Conección BD 
connection.connect(error => {
    if (error) throw error;
    console.log('Database serve running');
});

//Pintar el puerto en el cual esta corriendo el servidor 
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));