import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			phoneNumber: user.phoneNumber, // Change 'phone' to 'phoneNumber' to match your schema
			email: user.email,
			role: user.role,
		},
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN }
	);
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		throw new Error('Invalid token');
	}
};