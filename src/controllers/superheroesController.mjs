import {
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe, 
    borrarSuperheroe, 
    borrarSuperheroePorNombre,
    editarSuperheroe} 
    from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe, 
    renderizarListaSuperheroes} 
    from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({mensaje:'Superhéroe no encontrado'});
        }

        const superheroeFormateados = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateados);
    } catch (error) {
        res.status(500).send({mensaje:'Error al obtener el superhéroe', error: error.message});
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({mensaje:'No se encontraron superhéroes con ese atributo'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({mensaje:'Error al buscar los superhéroes', error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({mensaje:'No se encontraron superhéroes mayores de 30 años'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({mensaje:'Error al obtener los superhéroes mayores de 30 años', error: error.message});
    }
}

//Crear superhéroe
export async function crearSuperheroeController(req, res) {
  try {
    const datos = req.body;
    const nuevoSuperheroe = await crearSuperheroe(datos);
    const superheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
    res.status(201).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
  }
}

//Actualizar superhéroe

export async function actualizarSuperheroeController(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        // Actualizar el superhéroe
        await actualizarSuperheroe(id, datosActualizados);
        // Obtener el superhéroe actualizado
        const superheroeActualizado = await obtenerSuperheroePorId(id);
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        // Renderizar y devolver el superhéroe actualizado
        const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
        return res.status(200).json(superheroeFormateado);
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }

}

//Borrar superhéroe por id
// En tu controlador superheroesController.mjs
export async function borrarSuperheroeController(req, res) {
  const { id } = req.params;
  try {
    const superheroeBorrado = await borrarSuperheroe(id);
    if (!superheroeBorrado) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }
    res.redirect('/api/heroes/vista');
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al borrar el superhéroe', error: error.message });
  }
}

// Borrar superhéroe por nombre

export async function borrarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;
    try {
        const superheroeBorrado = await borrarSuperheroePorNombre(nombre);
        if (!superheroeBorrado) {
        return res.status(404).send({ mensaje: 'Superhéroe no encontrado con ese nombre' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeBorrado);
        return res.status(200).json(superheroeFormateado);
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al eliminar por nombre', error: error.message });
    }
}



export async function vistaDasboardSuperheroesController(req, res) {
    try {
     const superheroes = await obtenerTodosLosSuperheroes();
     res.render('dashboard', { superheroes });
}catch (error) {
    res.status(500).send({ mensaje: 'Error al cargar el dashboard', error: error.message });
    }
}

// Agregar nuevo superhéroe desde formulario
export async function agregarSuperheroeController(req, res) {
  try {
    console.log('Request body:', req.body);
    let { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;

    const nuevo = await crearSuperheroe({
      nombreSuperheroe: (nombreSuperheroe || '').trim(),
      nombreReal: nombreReal.trim(),
      edad: parseInt(edad),
      planetaOrigen: planetaOrigen?.trim(),
      debilidad: debilidad?.trim(),
      poderes: poderes,
      aliados: aliados,
      enemigos: enemigos,
      creador: creador?.trim()
    });

    // Redirigir después de crear el superhéroe
    return res.redirect('/api/heroes/vista'); // Asegúrate de usar return aquí
  } catch (error) {
    return res.status(500).send({ mensaje: 'Error al agregar superhéroe', error: error.message });
  }
}

// Editar superhéroe
export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;
        await editarSuperheroe(id, datos);
        res.redirect('/api/heroes/vista'); // Redirige al dashboard después de editar
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al editar el superhéroe', error: error.message });
    }
}

// Eliminar superhéroe
export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    await superHeroRepository.eliminarPorId(id);
    res.redirect('/api/heroes/vista');
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar superhéroe', error: error.message });
  }
}

