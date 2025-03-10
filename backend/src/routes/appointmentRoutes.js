import express from 'express';
import { appointmentController } from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, appointmentController.getPatientAppointments);
router.put('/:id/cancel', authMiddleware, appointmentController.cancelAppointment);
router.put('/:id/reschedule', authMiddleware, appointmentController.rescheduleAppointment);
router.post('/book', authMiddleware, appointmentController.bookAppointment);

export default router;