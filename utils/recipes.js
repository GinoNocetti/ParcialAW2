import { readFile, writeFile } from 'fs/promises' 

const fileRecetas = await readFile('./data/recetas.json', 'utf-8') 
const recetasItems = JSON.parse(fileRecetas)

const recipesFilePath = './data/recetas.json';

export const leerJsonRecetas = async () => {
    try {
        const fileRecetas = await readFile('./data/recetas.json', 'utf-8');
        const recetasItems = JSON.parse(fileRecetas);
        return recetasItems;
    } catch (error) {
        console.log('Error al leer el archivo de recetas:', error);
        throw error;
    }
}

export const guardarJsonRecetas = async (recetas) => {
    try {
        await writeFile(recipesFilePath, JSON.stringify(recetas, null, 2));
    } catch (error) {
        console.log('Error al escribir en el archivo de recetas:', error);
        throw error;
    }
};
