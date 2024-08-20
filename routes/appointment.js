const express = require('express');
const Appointment = require('../models/booking');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Create a new appointment
router.post('/book', authMiddleware, async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req, res);
        res.status(201).json(newAppointment);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error booking appointment'(err) });
    }
});

// Get all appointments
router.get('/appointments', authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.getAll();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

// Update an appointment
router.put('/appointments/:id', authMiddleware, async (req, res) => {
    try {
        const updatedAppointment = await Appointment.update(req, res);
        res.status(200).json(updatedAppointment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error updating appointment' });
    }
});

// Delete an appointment
router.delete('/appointments/:id', authMiddleware, async (req, res) => {
    try {
        const deletedAppointment = await Appointment.delete(req, res);
        res.status(200).json(deletedAppointment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error deleting appointment' });
    }
});


module.exports = router;
