import { body } from "express-validator";


//Validacion para nuevo superheroe
export const validarNuevoSuperheroe = () => [
    body('nombreSuperheroe').notEmpty().withMessage('Nombre superheroe es necesario')
        .isLength({ min: 3, max: 60 }).withMessage('Nombre del heroe debe tener entre 3 y 60 caracteres')
        .trim(),
    body('nombreReal').notEmpty().withMessage('Nombre Real es requerido')
        .isLength({ min: 3, max: 60 }).withMessage('Nombre real debe tener entre 3 y 60 caracteres')
        .trim(),
    body('edad').notEmpty().withMessage('Edad es requerida')
        .isInt({ min: 0 }).withMessage('Edad incorrecta')
        .trim(),
    body('poderes')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .notEmpty().withMessage('Lista de poderes requerida')
        .isArray({ min: 1 }).withMessage('Poderes no es un array o está vacío'),
    body('aliados')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .optional({ nullable: true })
        .isArray().withMessage('Aliados debe ser un array'),
    body('enemigos')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .optional({ nullable: true })
        .isArray().withMessage('Enemigos debe ser un array'),
    body('poderes.*')
        .isString().withMessage('Cada poder debe ser una cadena de texto')
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
        .trim()
]

//Validacion para editar superheroe
export const validarEdicionSuperheroe = () => [
    body('nombreSuperheroe').notEmpty().withMessage('Nombre superheroe es necesario')
        .isLength({ min: 3, max: 60 }).withMessage('Nombre del heroe debe tener entre 3 y 60 caracteres')
        .trim(),
    body('nombreReal').notEmpty().withMessage('Nombre Real es requerido')
        .isLength({ min: 3, max: 60 }).withMessage('Nombre real debe tener entre 3 y 60 caracteres')
        .trim(),
    body('edad').notEmpty().withMessage('Edad es requerida')
        .isInt({ min: 0 }).withMessage('Edad incorrecta')
        .trim(),
    body('poderes')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .notEmpty().withMessage('Lista de poderes requerida')
        .isArray({ min: 1 }).withMessage('Poderes no es un array o está vacío'),
    body('aliados')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .optional({ nullable: true })
        .isArray().withMessage('Aliados debe ser un array'),
    body('enemigos')
        .customSanitizer(function(value) {
            if (Array.isArray(value)) {
                return value.map(v => String(v).trim()).filter(Boolean);
            }
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(Boolean);
            }
            return [];
        })
        .optional({ nullable: true })
        .isArray().withMessage('Enemigos debe ser un array'),
    body('poderes.*')
        .isString().withMessage('Cada poder debe ser una cadena de texto')
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
        .trim()
      ]