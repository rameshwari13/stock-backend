const { Client } =require('pg');
const client =new Client({
   user:'postgres',
   database:'stock_management_db',
   host: 'localhost',
   port: 5432,
   password: 'root'
});

client.connect().then(res =>{
   console.log('PostgreSql connected')
}).catch(err =>{
   console.log('Error while connecting to database',err)
});

module.exports = client;