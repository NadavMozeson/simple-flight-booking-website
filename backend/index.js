const express = require('express');

const app = express();
const PORT = 3001;

require('./utils/listenToRoutes')(app);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running http://localhost:"+PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);