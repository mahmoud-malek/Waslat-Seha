import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { validateEmail, validatePhoneNumber } from "../utils/validators.js";
import { generateToken } from "../config/jwt.js";
import bycrypt from 'bcrypt'

const prisma = new PrismaClient();

export const userController = {
	// Get all users
	async getUsers(req, res) {
		try {
			const users = await prisma.user.findMany({
				include: {
					profile: true,
					appointments: true
				}
			});

			res.json(users);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// get user by phone number
	async getUserByPhoneNumber(req, res) {
		const { phoneNumber } = req.params;
		try {
			const user = await prisma.user.findFirst({
				where: { phoneNumber },
				include: {
					profile: true,
					appointments: true
				}
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			res.json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// Get user by ID
	async getUserById(req, res) {
		const { id } = req.params;
		try {
			const user = await prisma.user.findUnique({
				where: { id: parseInt(id) },
				include: {
					profile: true,
					appointments: true
				}
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			res.json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Register new user
	async register(req, res) {
		const { phoneNumber, email, password, firstName, lastName, address } = req.body;

		try {
			// Validate input
			if (!phoneNumber || !password) {
				return res.status(400).json({ error: "Phone number and password are required" });
			}

			if (email && !validateEmail(email)) {
				return res.status(400).json({ error: "Invalid email format" });
			}

			if (!validatePhoneNumber(phoneNumber)) {
				return res.status(400).json({ error: "Invalid phone number format" });
			}

			// Check if user already exists
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [
						{ phoneNumber },
						{ email: email || undefined }
					]
				}
			});

			if (existingUser) {
				return res.status(400).json({
					error: "User with this phone number or email already exists"
				});
			}

			// Hash password
			const hashedPassword = bycrypt.hash(password);

			// Create user with profile
			const user = await prisma.user.create({
				data: {
					phoneNumber,
					email,
					password: hashedPassword,
					profile: {
						create: {
							firstName,
							lastName,
							address
						}
					}
				},
				include: {
					profile: true
				}
			});

			// Remove password from response
			const { password: _, ...userWithoutPassword } = user;

			res.status(201).json(userWithoutPassword);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Change password
	async changePassword(req, res) {
		const { id } = req.params;
		const { currentPassword, newPassword } = req.body;

		try {
			const user = await prisma.user.findUnique({
				where: { id: parseInt(id) }
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			// Verify current password
			const isValid = await comparePassword(currentPassword, user.password);
			if (!isValid) {
				return res.status(401).json({ error: "Current password is incorrect" });
			}

			// Hash new password
			const hashedPassword = await hashPassword(newPassword);

			// Update password
			await prisma.user.update({
				where: { id: parseInt(id) },
				data: { password: hashedPassword }
			});

			res.json({ message: "Password updated successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async updateProfile(req, res) {
		try {
			const userId = req.user.id; // Get ID from authenticated user
			const { firstName, lastName, email, phoneNumber, gender, bloodType, birthDate, address } = req.body;

			const updatedUser = await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					email,
					phoneNumber,
					profile: {
						update: {
							firstName,
							lastName,
							address,
							gender,
							bloodType,
							birthDate: birthDate ? new Date(birthDate) : undefined
						}
					}
				},
				include: {
					profile: true
				}
			});

			// Remove sensitive data
			const { password, ...userWithoutPassword } = updatedUser;
			res.json(userWithoutPassword);
		} catch (error) {
			console.error('Profile update error:', error);
			res.status(500).json({ error: 'Failed to update profile' });
		}
	},

	// Delete user
	async deleteUser(req, res) {
		const { id } = req.params;

		try {
			await prisma.user.delete({
				where: { id: parseInt(id) }
			});

			res.json({ message: "User deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async updateProfilePicture(req, res) {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}

			const userId = req.user.id;
			const profileImagePath = `/uploads/profiles/${req.file.filename}`;

			const updatedUser = await prisma.user.update({
				where: { id: userId },
				data: {
					profileImage: profileImagePath
				},
				include: {
					profile: true
				}
			});

			// Remove sensitive data
			const { password, ...userWithoutPassword } = updatedUser;

			res.json({
				success: true,
				profileImage: profileImagePath,
				user: userWithoutPassword
			});
		} catch (error) {
			console.error('Profile picture upload error:', error);
			res.status(500).json({ error: 'Failed to update profile picture' });
		}
	},
	
	async getProfilePicture(req, res) {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({
				where: { id: parseInt(id) },
				select: { profileImage: true }
			});

			if (!user || !user.profileImage) {
				return res.status(404).json({ error: 'Profile picture not found' });
			}

			res.json({ profileImage: user.profileImage });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	async getUserProfile(req, res) {
		try {
			const userId = req.user.id;
			const user = await prisma.user.findUnique({
				where: { id: userId },
				include: {
					profile: true,
					appointments: {
						include: {
							doctor: {
								include: {
									user: {
										select: {
											profile: true
										}
									}
								}
							},
							clinic: true
						},
						orderBy: {
							datetime: 'desc'
						}
					}
				}
			});

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const { password, ...userWithoutPassword } = user;
			res.json(userWithoutPassword);
		} catch (error) {
			console.error('Profile fetch error:', error);
			res.status(500).json({ error: "Failed to fetch user profile" });
		}
	},

	async getAppointments(req, res) {
		try {
			const userId = req.user.id;
			const appointments = await prisma.appointment.findMany({
				where: {
					patientId: userId,
					status: {
						not: 'CANCELLED'
					}
				},
				include: {
					doctor: {
						include: {
							user: {
								select: {
									profile: true
								}
							}
						}
					},
					clinic: true
				},
				orderBy: {
					datetime: 'desc'
				}
			});

			res.json(appointments);
		} catch (error) {
			console.error('Appointments fetch error:', error);
			res.status(500).json({ error: "Failed to fetch appointments" });
		}
	},

	async getMedicalHistory(req, res) {
		try {
			const userId = req.user.id;
			const medicalHistory = await prisma.medicalRecord.findMany({
				where: { patientId: userId },
				include: {
					doctor: {
						include: {
							user: {
								select: {
									profile: true
								}
							}
						}
					}
				},
				orderBy: {
					date: 'desc'
				}
			});

			res.json(medicalHistory);
		} catch (error) {
			console.error('Medical history fetch error:', error);
			res.status(500).json({ error: "Failed to fetch medical history" });
		}
	}


};