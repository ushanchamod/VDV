import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import AdminRoutes from './routes/AdminRoutes.js'
import PublicRoutes from './routes/PublicRoutes.js'
import { CreateSuperAdmin } from './service/database_connection.js';

const application = async () => {

  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  })

  app.options('*', (req, res) => res.sendStatus(200));

  app.use('/admin', AdminRoutes);
  app.use('/public', PublicRoutes);
  
  const result = await CreateSuperAdmin();

  if (result) {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    });
  }
  else {
    console.log('Error creating super admin');
  }

}

application();
