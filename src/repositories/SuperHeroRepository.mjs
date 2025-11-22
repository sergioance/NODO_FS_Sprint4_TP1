import SuperHero from '../models/superHero.mjs';
import Repository from './Repository.mjs';

class SuperHeroRepository extends Repository {
    //Crear superheroe
    async crear(superheroe) {
        const nuevoSuperheroe = new SuperHero(superheroe);
        return await nuevoSuperheroe.save();
    }
    
    //Obtener todos los superheroes
    async obtenerTodos() {
        return await SuperHero.find({});
    }

    //Obtener superheroe por ID
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }
    
    //Editar (actualizar) superheroe por ID
    async editarPorId(id, datos) {
        return await SuperHero.findByIdAndUpdate(id, datos, { new: true });
    }

    // Eliminar superhéroe por ID
    async eliminarPorId(id) {
        const eliminado = await SuperHero.findByIdAndDelete(id);
        if (!eliminado) {
            throw new Error('Superhéroe no encontrado');
        }
        return eliminado;
    }

    // Eliminar por nombre del superhéroe
    async eliminarPorNombre(nombre) {
        const eliminado = await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        if (!eliminado) {
            throw new Error('Superhéroe no encontrado');
        }
        return eliminado;
    }

    // Buscar por cualquier atributo
    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    // Filtrar mayores de 30 años
    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }
}


// --- FUNCIÓN ACTUALIZAR PARA USO DIRECTO DESDE EL SERVICIO ---
export async function actualizar(id, datosActualizados) {
    const superheroe = await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!superheroe) {
        throw new Error('Superhéroe no encontrado');
    }
    return superheroe;
}



// Exporta la instancia por defecto y la función actualizar
export default new SuperHeroRepository();


