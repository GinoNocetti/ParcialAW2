/*import { recipe } from "../../components/recipe.js"

const btnAdd = document.getElementById("add")
const btnCancel = document.getElementById("cancel")
const btnCreate = document.getElementById('create')

const arrIng = []

btnCreate.addEventListener('click',()=>{
    const name = document.getElementById("name").value
    /*Se debe añadir la receta creada al servidor */
//})

/*btnAdd.addEventListener('click',()=>{
    const quantity = document.getElementById("quantity").value
    const ing = document.getElementById("ing").value
    const li = document.createElement('li')


    arrIng.push({quantity, ing})
    li.textContent = `${ing}: ${quantity}`
    document.getElementById('list').appendChild(li)
})


btnCancel.addEventListener('click',()=>{
    arrIng.splice(0,arrIng.length)
    document.getElementById('list').innerHTML = ''
})

window.addEventListener('load', function() {
    /*Llenar lista con las recetas existentes
        Se debe usar el componente recipe que recibe dos parametros, title y un array con los ingredientes de la receta llamado ing
    */

    //document.getElementById('listRecipe').innerHTML = recipe("Pizza", [{name:"Queso", quantity:120}, {name:"Salsa", quantity:150}])
//})*/


import { recipe } from "../../components/recipe.js";

const baseURL = 'http://localhost:3000'; 

const btnAdd = document.getElementById("add");
const btnCancel = document.getElementById("cancel");
const btnCreate = document.getElementById('create');
const listRecipeContainer = document.getElementById('listRecipe');

const arrIng = [];

const cargarRecetas = async () => {
    try {
        const responseIngredientes = await fetch(`${baseURL}/ing/todosIngredientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!responseIngredientes.ok) {
            throw new Error('No se pudo obtener la lista de ingredientes.');
        }

        const ingredientes = await responseIngredientes.json();
        const ingredientesMap = new Map(ingredientes.map(ing => [Number(ing.id), ing.name]));

        const responseRecetas = await fetch(`${baseURL}/recetas/todasRecetas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!responseRecetas.ok) {
            throw new Error('No se pudo obtener la lista de recetas.');
        }

        const recetas = await responseRecetas.json();
        console.log('Recetas existentes:', recetas);

        listRecipeContainer.innerHTML = '';

        recetas.forEach(receta => {
            const ingredientesConNombre = receta.ingredientes.map(ing => ({
                name: ingredientesMap.get(Number(ing.idIngrediente)),
                quantity: ing.cantidad
            }));
            listRecipeContainer.innerHTML += recipe(receta.nombre, ingredientesConNombre);
        });
    } catch (error) {
        console.error('Error al obtener las recetas:', error.message);
        alert('Hubo un error al cargar las recetas. Por favor intenta nuevamente.');
    }
};

const cargarIngredientesDropdown = async () => {
    try {
        const response = await fetch(`${baseURL}/ing/todosIngredientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de ingredientes.');
        }
        const ingredientes = await response.json();
        console.log('Ingredientes existentes:', ingredientes);

        const ingDropdown = document.getElementById('ing');
        ingDropdown.innerHTML = '';

        ingredientes.forEach(ingrediente => {
            const option = document.createElement('option');
            option.value = ingrediente.id;
            option.textContent = ingrediente.name;
            ingDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener los ingredientes:', error.message);
        alert('Hubo un error al cargar los ingredientes. Por favor intenta nuevamente.');
    }
};

btnAdd.addEventListener('click', () => {
    const quantity = document.getElementById("quantity").value;
    const ingDropdown = document.getElementById("ing");
    const ingId = Number(ingDropdown.value);
    const ingName = ingDropdown.options[ingDropdown.selectedIndex].text;
    const li = document.createElement('li');

    arrIng.push({ idIngrediente: ingId, nombre: ingName, cantidad: quantity });
    li.textContent = `${ingName}: ${quantity}g`;
    document.getElementById('list').appendChild(li);

    document.getElementById('quantity').value = '';
});

btnCreate.addEventListener('click', async () => {
    const name = document.getElementById("name").value.trim();

    if (name === '' || arrIng.length === 0) {
        alert('Por favor ingresa un nombre para la receta y añade al menos un ingrediente.');
        return;
    }

    const nuevaReceta = {
        nombre: name,
        ingredientes: arrIng
    };

    try {
        const response = await fetch(`${baseURL}/recetas/agregarRecetas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaReceta)
        });

        if (!response.ok) {
            throw new Error('No se pudo agregar la receta.');
        }

        const resultado = await response.json();
        console.log('Receta agregada:', resultado);

        document.getElementById('name').value = '';
        document.getElementById('list').innerHTML = '';
        arrIng.length = 0;

        cargarRecetas();
    } catch (error) {
        console.error('Error al agregar la receta:', error.message);
        alert('Hubo un error al agregar la receta. Por favor intenta nuevamente.');
    }
});

btnCancel.addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('list').innerHTML = '';
    arrIng.length = 0;
});

window.addEventListener('load', function () {
    cargarRecetas();
    cargarIngredientesDropdown();
});
