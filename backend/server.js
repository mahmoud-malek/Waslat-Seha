import app from './src/app.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});