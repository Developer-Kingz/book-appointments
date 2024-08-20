const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.POSTGRES_PASS,
    database: "postgres"
})

module.exports = client