import pkg from 'pg'
const { Pool } = pkg;

const db = new Pool({
    host: "9qasp5v56q8ckkf5dc.leapcellpool.com",
    user: "vyuagxnivjqpaocwidgs",
    password: "lmytjdkygrfxriixhtaebxarqxbgfr",
    database: "ovazhjkuhryqtkqekcxi",
    port: 6438
})

db.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke database');
})

export default db;