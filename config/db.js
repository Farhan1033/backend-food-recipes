import mysql from 'mysql2'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'db_recipes'
});

db.getConnection((err) => {
    if (err) throw err;
    console.log('Terhubung ke database MYSQL');
})

export default db;