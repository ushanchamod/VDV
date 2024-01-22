import express from 'express';
const router = express.Router();
import session from 'express-session';
import multer from 'multer';
import { AddJob, AdminCheckAuth, AdminLogin, AdminLogout, GetJob, GetJobNumber, GetLocation } from '../controllers/index.js';
import { CheckAuth } from '../utility/check_auth.js';

router.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.post('/login', AdminLogin);

router.use((req, res, next) => CheckAuth(req, res, next));

router.get('/check-auth', AdminCheckAuth);
router.get('/logout', AdminLogout);
router.get('/getJobNo', GetJobNumber)
router.post('/job', uploadStorage.single('file'), AddJob)
router.get('/jobs', GetJob)
router.get('/location', GetLocation);

export default router;
