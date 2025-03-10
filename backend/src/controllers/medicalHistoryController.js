import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const medicalHistoryController = {
	async getPatientHistory(req, res) {
		try {
			const medicalHistory = await prisma.medicalRecord.findMany({
				where: {
					patientId: req.user.id
				},
				include: {
					doctor: {
						include: {
							user: {
								select: {
									profile: {
										select: {
											firstName: true,
											lastName: true
										}
									}
								}
							}
						}
					}
				},
				orderBy: {
					date: 'desc'
				}
			});

			const formattedHistory = medicalHistory.map(record => ({
				id: record.id,
				diagnosis: record.diagnosis,
				doctorName: `${record.doctor.user.profile.firstName} ${record.doctor.user.profile.lastName}`,
				date: record.date,
				notes: record.notes
			}));

			res.json(formattedHistory);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};