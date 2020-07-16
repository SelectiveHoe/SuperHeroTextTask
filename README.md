# SuperHeroTextTask
Front End:
do "npm start" to start frontend.

Back End:
do "node server" to start backend.

DataBase:
To run backend successfully with data base you need to open NodeJSBackEnd/DataLayer.js and change connectionDetails (4 row) for your PostgreSQL server.
```javascript
const connectionDetails = {
    host: "localhost", 
    user: "postgres", // UserName
    password: "admin", // User Password
    database: 'SuperHeroDB',
    port: 5432
};
```
