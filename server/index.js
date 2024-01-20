import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const application = async () => {
  const app = express();


  


  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  });
}

application();
