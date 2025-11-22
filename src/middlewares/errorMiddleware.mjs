 import { validationResult } from 'express-validator';

// Middleware de validación para Superhéroes
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: 'Error de validación',
            errores: errors.array()

        });
    }
    next();
};