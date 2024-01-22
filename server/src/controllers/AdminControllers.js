import pool from '../service/database_connection.js';
import { comparePassword } from '../utility/password.js';

export const AdminLogin = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        const [result] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const admin = result[0];

        const match = await comparePassword(password, admin.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const _admin = {
            username: admin.username,
            super_admin: admin.super_admin,
            id: admin.id
        }

        req.session.admin = _admin;

        return res.status(200).json(req.session.admin);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const AdminLogout = async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: 'Logged out' });
}

export const AdminCheckAuth = (req, res, next) => {
    res.status(200).json(req.session.admin);
}

export const GetJobNumber = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT job_no FROM job ORDER BY job_no DESC LIMIT 1');
        if (result.length === 0) {
            return res.status(200).json({ job_no: 111 });
        }
        const job_no = result[0].job_no + 5;
        return res.status(200).json({ job_no });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }

}

export const AddJob = async (req, res) => {
    const { job_no, critical, location } = req.body;
    const {id} = req.session.admin;

    if (req.file == undefined) {
        return res.status(400).json({
            message: 'Image is required'
        })
    }

    const image = req.file.filename;
    console.log(image);

    if (!job_no || !critical || !location || !image) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        await pool.query('INSERT INTO job (job_no, critical, location, image, createBy) VALUES (?, ?, ?, ?, ?)', [job_no, critical, location, image, id]);
        return res.status(200).json({ message: 'Job added' });
    }
    catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Job No. already exists' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
}

export const GetLocation = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM location');
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const GetJob = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT job.*, location.name FROM job inner join location on job.location = location.id');
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}