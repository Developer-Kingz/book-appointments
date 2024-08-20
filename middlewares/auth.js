const express = require('express');
const router = express.Router();

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || authorization !== process.env.USER_AUTH) {
            return res.status(401).send('Unauthorized');
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = { authMiddleware };
