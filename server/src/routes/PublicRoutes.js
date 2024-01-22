import express from 'express';
const router = express.Router();
import path from 'path';

router.get('/image/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Image id is required' });
    }

    const current_directory = path.resolve();

    const image_path = path.join(current_directory, 'uploads', id);

    res.sendFile(image_path);

})

export default router;