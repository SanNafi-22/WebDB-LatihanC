const express = require("express");
const { Client } = require("pg");

const app = express();

const client = new Client({
    host: "db",
    user: "admin",
    password: "admin123",
    database: "latihan",
    port: 5432
});

client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello DevOps!");
});

app.get("/db", async (req, res) => {

    await client.query(
        "CREATE TABLE IF NOT EXISTS pesan(id SERIAL PRIMARY KEY, nama TEXT)"
    );

    await client.query(
        "INSERT INTO pesan(nama) VALUES('Hello DevOps')"
    );

    const result = await client.query(
        "SELECT * FROM pesan"
    );

    res.json(result.rows);

});

app.listen(3000, () => {
    console.log("Running on port 3000");
});