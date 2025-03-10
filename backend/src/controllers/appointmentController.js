import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const appointmentController = {
	async getPatientAppointments(req, res) {
		try {
			const appointments = await prisma.appointment.findMany({
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
					},
					clinic: true
				},
				orderBy: {
					datetime: 'asc'
				}
			});

			const formattedAppointments = appointments.map(appointment => ({
				id: appointment.id,
				doctorName: `${appointment.doctor.user.profile.firstName} ${appointment.doctor.user.profile.lastName}`,
				specialty: appointment.doctor.speciality,
				clinic: appointment.clinic.name,
				date: appointment.datetime,
				time: new Date(appointment.datetime).toLocaleTimeString(),
				status: appointment.status
			}));

			res.json(formattedAppointments);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async cancelAppointment(req, res) {
		try {
			const { id } = req.params;
			const appointment = await prisma.appointment.update({
				where: {
					id: parseInt(id),
					patientId: req.user.id
				},
				data: {
					status: 'CANCELLED'
				}
			});

			res.json(appointment);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async rescheduleAppointment(req, res) {
		try {
			const { id } = req.params;
			const { datetime } = req.body;

			const appointment = await prisma.appointment.update({
				where: {
					id: parseInt(id),
					patientId: req.user.id
				},
				data: {
					datetime: new Date(datetime),
					status: 'RESCHEDULED'
				}
			});

			res.json(appointment);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	async bookAppointment(req, res) {
		try {
			const {
				doctorId,
				clinicId,
				datetime,
				notes
			} = req.body;

			// Validate required fields
			if (!doctorId || !clinicId || !datetime) {
				return res.status(400).json({
					error: "Missing required fields"
				});
			}

			// Convert datetime string to Date object
			const appointmentDate = new Date(datetime);

			// Check if the date is valid
			if (isNaN(appointmentDate.getTime())) {
				return res.status(400).json({
					error: "Invalid date format"
				});
			}

			// Check if appointment slot is available
			const existingAppointment = await prisma.appointment.findFirst({
				where: {
					doctorId: parseInt(doctorId),
					clinicId: parseInt(clinicId),
					datetime: appointmentDate,
					status: {
						notIn: ['CANCELLED']
					}
				}
			});

			if (existingAppointment) {
				return res.status(409).json({
					error: "This time slot is already booked"
				});
			}

			// Create new appointment
			const appointment = await prisma.appointment.create({
				data: {
					patient: {
						connect: { id: req.user.id }
					},
					doctor: {
						connect: { id: parseInt(doctorId) }
					},
					clinic: {
						connect: { id: parseInt(clinicId) }
					},
					datetime: appointmentDate,
					notes: notes || "",
					status: 'PENDING'
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
					},
					clinic: true
				}
			});

			// Format the response
			const formattedAppointment = {
				id: appointment.id,
				doctorName: `${appointment.doctor.user.profile.firstName} ${appointment.doctor.user.profile.lastName}`,
				specialty: appointment.doctor.speciality,
				clinic: appointment.clinic.name,
				date: appointment.datetime,
				time: appointment.datetime.toLocaleTimeString(),
				status: appointment.status,
				notes: appointment.notes
			};

			res.status(201).json(formattedAppointment);
		} catch (error) {
			console.error('Book appointment error:', error);
			res.status(500).json({
				error: "Failed to book appointment"
			});
		}
	}
};