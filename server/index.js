import express from 'express'
import prisma from './prisma/prismaClient.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {
  const { name } = req.body
  const task = await prisma.task.create({
    data: { name },
  })
  res.status(201).json(task)
})

// tiene que ir al ultimo para levantarlo cuando estan todas las rutas listas
app.listen(PORT, () => {
  console.log('Listening at http:localhost:3000')
})
