const app = require('./app');
const db = require("../models");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3000;

db.sequelize
    .authenticate()
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(PORT, (err) => {
            if (err) {
                return console.log("Error", err);
            }
            console.log(`Servidor escuchando en puerto ${PORT}`);
            return app;
    });
})
.catch((err) => console.log("No se pudo conectar a la base de datos", err));


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('rifa_pap_development', 'gonzaloi', 'Tortuga100.', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432, // Puerto predeterminado de PostgreSQL
// });

// // Prueba la conexión
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Conexión a la base de datos establecida correctamente.');
//   } catch (error) {
//     console.error('Error al conectar a la base de datos:', error.message);
//   }
// }

// testConnection();
