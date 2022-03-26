const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = function (app) {
  app.get('/category', async (req, res, next) => {
    try {
      const allCategories = await prisma.categories.findMany()
      res.status(200).json({
        status: 'success',
        data: allCategories,
      })
    } catch (err) {
      res.status(500)
      next(err)
    }
  })

  app.post('/category', async (req, res, next) => {
    try {
      const createdCategory = await prisma.categories.create({
        data: {
          name: req.body.name,
        },
      })
      res.status(200).json({
        status: 'success',
        data: createdCategory,
      })
    } catch (err) {
      res.status(500).json({
        status: 'error',
        data: err,
      })
      next(err)
    }
  })
}
