import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userController = {
	async getUsers(req, res) {
		try {
			const users = await prisma.user.findMany({
				include: { profile: true }
			});
			res.json(users);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// ... other user-related controllers
};