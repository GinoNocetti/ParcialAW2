import { Router } from 'express'
import { leerJsonRecetas, guardarJsonRecetas } from '../utils/recipes.js'

const router = Router()

const recipesFilePath = './data/recetas.json';

router.post('/agregarRecetas', async (req, res) => {
    const { nombre, ingredientes } = req.body;

    try {
        const recetas = await leerJsonRecetas();

        const nuevoIdReceta = recetas.length > 0 ? recetas[recetas.length - 1].id + 1 : 1;

        const ingredientesAjustados = ingredientes.map(ingrediente => ({
            idIngrediente: ingrediente.idIngrediente,
            cantidad: ingrediente.cantidad
        }));        

        const nuevaReceta = {
            id: nuevoIdReceta,
            nombre,
            ingredientes: ingredientesAjustados
        };

        recetas.push(nuevaReceta);

        await guardarJsonRecetas(recetas);

        res.status(201).json({ status: true, message: 'Receta agregada correctamente.', receta: nuevaReceta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

router.get('/todasRecetas', async (req, res) => {
    try {
        const recetas = await leerJsonRecetas(recipesFilePath);
        if (recetas) {
            res.status(200).json(recetas);
        } else {
            res.status(404).json({ status: false, message: 'No se encontraron recetas.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error interno del servidor.' });
    }
});

export default router