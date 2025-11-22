import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { actualizar } from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

//Crear superheroe
export async function crearSuperheroe(superheroe){
   return await superHeroRepository.crear (superheroe)
    
}
//Actualizar superhéroe
/* export async function actualizarSuperheroe(id, data) {
    await superHeroRepository.actualizar(id, data);
    return await superHeroRepository.obtenerTodos();
} */
//Borrar superhéroe por id
/* export async function borrarSuperheroe(id) {
    return await superHeroRepository.borrar(id);
} */
export async function borrarSuperheroe(id) {
  return await superHeroRepository.eliminarPorId(id);
}

//Borrar superhéroe por nombre
export async function borrarSuperheroePorNombre(nombre) {
    return await superHeroRepository.borrarPorNombre(nombre);
}

export async function editarSuperheroe(id, datos) {
   return await superHeroRepository.editarPorId(id, datos);
}



export async function actualizarSuperheroe(id, datosActualizados) {
  return await actualizar(id, datosActualizados);
}

export async function eliminarPorId(id) {
  return superHeroRepository.eliminarPorId(id);
}
