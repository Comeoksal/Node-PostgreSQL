import dotenv from 'dotenv';
import pkg from "pg";

dotenv.config();

const { Client } = pkg;
const dbclient = new Client({
    host: "localhost",
    port: process.env.DB_PORT,
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "User"
})

export const dbconnect = async () => {
    try {
        dbclient.connect()
        console.log("PostgresQL connected..");
    } catch (err) {
        console.error("Can't connect PostgreSQL!!");
    }
}
export const exampleQuery = async () => {
    dbclient.query(`Select * from userinfo`, async (err, res) => {
        try {
            if (!err) {
                console.log(res.rows);
            } else {
                console.log(err.message);
            }
            dbclient.end;
        } catch (err) {
            console.error("query failed..", err);
        }
    })
}