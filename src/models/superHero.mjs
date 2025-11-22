import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    nombreSuperheroe: { type: String },
    nombreReal: { type: String },
    edad: { type: Number },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: [String],
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador: String,
    createdAt: { type: Date, default: Date.now }
});

const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-11');

export default superHero;