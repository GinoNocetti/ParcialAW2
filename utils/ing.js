import { readFile, writeFile } from 'fs/promises';

const ingredientsFilePath = './data/ingredientes.json';

export const leerJsonIngredientes = async () => {
    try {
        const fileIngredientes = await readFile(ingredientsFilePath, 'utf-8');
        const ingredientesItems = JSON.parse(fileIngredientes);
        return ingredientesItems;
    } catch (error) {
        console.log('Error al leer el archivo de ingredientes:', error);
        throw error;
    }
};

export const guardarJsonIngredientes = async (ingredientes) => {
    try {
        await writeFile(ingredientsFilePath, JSON.stringify(ingredientes, null, 2));
    } catch (error) {
        console.log('Error al escribir en el archivo de ingredientes:', error);
        throw error;
    }
};
