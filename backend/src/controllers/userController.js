import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { validateEmail, validatePhoneNumber } from "../utils/validators.js";
import { generateToken } from "../config/jwt.js";

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
			const hashedPassword = await hashPassword(password);

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

	// Update profile
	async updateProfile(req, res) {
		const { id } = req.params;
		const { firstName, lastName, address } = req.body;

		try {
			const updatedUser = await prisma.user.update({
				where: { id: parseInt(id) },
				data: {
					profile: {
						update: {
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

			res.json(updatedUser);
		} catch (error) {
			res.status(500).json({ error: error.message });
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

	// udpate profile picture
	async updateProfilePicture(req, res) {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}

			const { id } = req.user;
			const profileImagePath = `/uploads/profiles/${req.file.filename}`;

			const updatedUser = await prisma.user.update({
				where: { id: parseInt(id) },
				data: {
					profileImage: profileImagePath
				},
				include: {
					profile: true
				}
			});

			res.json(updatedUser);
		} catch (error) {
			res.status(500).json({ error: error.message });
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
	}
};