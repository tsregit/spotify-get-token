require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')
import request from '../utils/utils';


app.use(cors())
app.get('/spotify-token', (req,res) => {
    (async () => {
        await request(process.env.URL_TOKEN_SPOTIFY, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            mode: 'no-cors',
            headers: {
                Authorization: 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
              },
        }).then(data => res.status(200).json(data)).catch(err => res.status(err.status).json(err)) 
      })();
})

app.listen(process.env.PORT, () =>{
   console.log(`Se inicio sesion en puerto: ${process.env.PORT}`); 
});