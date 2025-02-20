import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt.js';

const prisma = new PrismaClient();

export const authController = {
	async login(req, res) {
		try {
			const { phoneNumber, password, role } = req.body;

			const user = await prisma.user.findUnique({
				where: { phoneNumber },
				include: { profile: true }
			});

			if (!user || !(await bcrypt.compare(password, user.password))) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}

			if (user.role !== role) {
				return res.status(403).json({ error: `You cannot log in as ${role.toLowerCase()} with this account` });
			}

			const token = generateToken(user);
			res.json({ token, user: { ...user, password: undefined } });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async register(req, res) {
		try {
			const { phoneNumber, email, password, firstName, lastName } = req.body;

			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [
						{ phoneNumber },
						{ email: { equals: email, not: null } }
					]
				}
			});

			if (existingUser) {
				return res.status(400).json({ error: 'User already exists' });
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					phoneNumber,
					email,
					password: hashedPassword,
					profile: {
						create: {
							firstName,
							lastName
						}
					}
				},
				include: { profile: true }
			});

			const token = generateToken(user);
			res.status(201).json({ token, user: { ...user, password: undefined } });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};