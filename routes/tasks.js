const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = function (app) {
  app.get('/todos/all', async (req, res) => {
    try {
      const allTasks = await prisma.tasks.findMany()

      res.status(200).json({
        status: 'success',
        data: allTasks,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 'error',
        data: err,
      })
    }
  })

  app.get('/todos/:categoryId', async (req, res) => {
    try {
      const allTasks = await prisma.tasks.findMany({
        where: { category_id: parseInt(req.params.categoryId) },
      })
      res.status(200).json({
        status: 'success',
        data: allTasks,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 'error',
        data: err,
      })
    }
  })

  app.delete('/todos/:todoId', async (req, res) => {
    const idForDeletion = parseInt(req.params.todoId)

    try {
      const deletedTasks = await prisma.tasks.deleteMany({
        where: { id: idForDeletion },
      })
      res.status(200).json({
        status: 'success',
        data: deletedTasks,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 'error',
        data: err,
      })
    }
  })

  app.post('/todos', async (req, res) => {
    try {
      const insertedTodo = await prisma.tasks.create({
        data: {
          description: req.body.description,
          list_order: req.body.list_order,
          category_id: req.body.categoryId,
        },
      })

      res.status(200).json({
        status: 'success',
        data: {
          todo: insertedTodo,
        },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 'error',
        data: err,
      })
    }
  })
}
