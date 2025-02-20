import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt.js';

const prisma = new PrismaClient();

export const doctorController = {
	async getAllDoctors(req, res) {
		try {
			const { specialty, name, city, area } = req.query;

			// Build the where clause dynamically
			const where = {
				AND: [] // Use AND array for combining multiple conditions
			};

			// Add filters if they exist
			if (specialty) {
				where.AND.push({
					speciality: {
						equals: specialty,
						mode: 'insensitive' // Case insensitive search
					}
				});
			}

			if (name) {
				where.AND.push({
					user: {
						OR: [
							{
								profile: {
									firstName: {
										contains: name,
										mode: 'insensitive'
									}
								}
							},
							{
								profile: {
									lastName: {
										contains: name,
										mode: 'insensitive'
									}
								}
							}
						]
					}
				});
			}

			if (city) {
				where.AND.push({
					clinics: {
						some: {
							address: {
								contains: city,
								mode: 'insensitive'
							}
						}
					}
				});
			}

			if (area) {
				where.AND.push({
					clinics: {
						some: {
							address: {
								contains: area,
								mode: 'insensitive'
							}
						}
					}
				});
			}

			// If no filters are applied, remove the AND array
			if (where.AND.length === 0) {
				delete where.AND;
			}

			const doctors = await prisma.doctor.findMany({
				where,
				include: {
					user: {
						select: {
							id: true,
							phoneNumber: true,
							email: true,
							profileImage: true,
							profile: {
								select: {
									firstName: true,
									lastName: true,
								}
							}
						}
					},
					clinics: true,
				},
			});

			res.json(doctors);
		} catch (error) {
			console.error('Error fetching doctors:', error);
			res.status(500).json({ error: error.message });
		}
	},
	async register(req, res) {
		try {
			const {
				phoneNumber,
				email,
				password,
				firstName,
				lastName,
				speciality,
				experience,
				bio
			} = req.body;

			// Validate required fields
			if (!phoneNumber || !password || !speciality) {
				return res.status(400).json({
					error: 'Phone number, password, and speciality are required'
				});
			}

			// Check if doctor already exists
			const existingUser = await prisma.user.findFirst({
				where: {
					phoneNumber,
				}
			});

			if (existingUser) {
				return res.status(400).json({
					error: 'User with this phone number or email already exists'
				});
			}

			// Hash password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create user and doctor profile in a transaction
			const user = await prisma.user.create({
				data: {
					phoneNumber,
					email,
					password: hashedPassword,
					role: 'DOCTOR',
					profile: {
						create: {
							firstName,
							lastName
						}
					},
					doctor: {
						create: {
							speciality,
							experience,
							bio
						}
					}
				}
			});

			const token = generateToken(user);
			res.status(201).json({ token, user: { ...user, password: undefined } });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async createClinic(req, res) {
		try {
			const { doctorId, name, address, price } = req.body;

			const clinic = await prisma.clinic.create({
				data: {
					doctorId,
					name,
					address,
					price
				}
			});

			res.status(201).json(clinic);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async updateProfilePicture(req, res) {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}

			const { id } = req.user;
			const profileImagePath = `/uploads/profiles/${req.file.filename}`;

			const updatedDoctor = await prisma.user.update({
				where: { id: parseInt(id) },
				data: {
					profileImage: profileImagePath
				},
			});

			res.json(updatedDoctor);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: error.message });
		}
	}
};