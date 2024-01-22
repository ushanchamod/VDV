import mysql from 'mysql2/promise';
import randomstring from 'randomstring';
import { hashPassword } from '../utility/password.js';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cmms',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0
});

export default pool;

export const CreateSuperAdmin = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM admin WHERE super_admin = 1');
    
    if (rows.length === 0) {

      const random = randomstring.generate(6);

      const hash = await hashPassword(random);

      const [result] = await pool.query(
        'INSERT INTO admin (username, password, super_admin) VALUES (?, ?, ?)',
        ['superadmin', hash, true]
      );
      
      console.log(result);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
