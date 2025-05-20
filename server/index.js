import express from 'express'
import prisma from './prisma/prismaClient.js'

const app = express()
app.use(express.json())

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const task = tasks.find(task => task.id == taskId)

  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  res.json(task)
})

app.post('/tasks', async (req, res) => {
  const { name } = req.body
  const task = await prisma.task.create({
    data: { name },
  })
  res.status(201).json(task)
})

// tiene que ir al ultimo para levantarlo cuando estan todas las rutas listas
app.listen(3000, () => {
  console.log('Listening at http:localhost:3000')
})
