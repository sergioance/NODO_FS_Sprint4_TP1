import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect ('mongodb+srv://Grupo-11:grupo11@cursadanodejs.ls9ii.mongodb.net/Node-js');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Termina el proceso si la conexión falla
    }
}