import express from 'express'
import cors from 'cors';

const app = express()

const puerto = 3000

app.use(cors());

app.use(express.json())

import ingRouter from './routes/ing.routes.js'
import recetasRouter from './routes/recipes.routes.js'

app.listen(puerto, () =>{
    console.log(`Servidor levantado en el puerto ${puerto}`)
})

/* Levantamos el Front */
app.use(express.static('./public'))

/* Rutas */
app.use('/ing', ingRouter)
app.use('/recetas', recetasRouter)

app.get(`/`, (req, res)=>{
    res.send('Hola Mundo!')
})

app.get(`/Test`, (req, res)=>{
    res.send('Mensaje de prueba')
})