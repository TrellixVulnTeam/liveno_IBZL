import { Pool } from "pg";


const pool = new Pool({
user: "postgres",
password: "mohikanac10",
host: "localhost",
port: 5432,
database: "liveno"
})

export default pool
