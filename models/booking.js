const client = require('../connection.js')

const Appointment = {
    create: async (req, res) => {
        const { user_name, appointment_date, description } = req.body;
        if (!user_name || !appointment_date || !description) {
            return res.status(500).json({ error: 'Please Fill All Required Fields'});
        }
        const query = `
            INSERT INTO appointments (user_name, appointment_date, description)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const values = [user_name, appointment_date, description];
        const { rows } = await client.query(query, values);
        return rows[0];
    },

    getAll: async () => {
        const query = 'SELECT * FROM appointments;';
        const { rows } = await client.query(query);
        return rows;
    },
    
    update: async (req, res) => {
        const { id } = req.params;
        const { user_name, appointment_date, description } = req.body;

        if (!user_name || !appointment_date || !description) {
            return res.status(400).json({ error: 'Please Fill All Required Fields'});
        }

        const query = `
            UPDATE appointments
            SET user_name = $1, appointment_date = $2, description = $3
            WHERE id = $4
            RETURNING *;
        `;
        const values = [user_name, appointment_date, description, id];
        const { rows } = await client.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return rows[0];
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const query = `
            DELETE FROM appointments
            WHERE id = $1
            RETURNING *;
        `;
        const values = [id];
        const { rows } = await client.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return rows[0];
    },
};

module.exports = Appointment;
