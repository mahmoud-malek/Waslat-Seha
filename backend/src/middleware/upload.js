import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/profiles/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only JPEG, PNG and JPG are allowed.'), false);
	}
};

export const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter: fileFilter
});