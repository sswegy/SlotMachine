import mysql from "mysql2"

const pool = mysql
    .createPool({
        host: "localhost",
        user: "root",
        password: "Refd36987412",
        database: "slot_machine"
    })
    .promise();

export default pool