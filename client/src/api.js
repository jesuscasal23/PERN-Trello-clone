const fetchCategories = async () => {
  const res = await fetch('http://localhost:3000/category')
  return res.json()
}

const fetchTodos = async () => {
  const res = await fetch('http://localhost:3000/todos/all')
  return res.json()
}

const fetchTodosByCategoryId = async categoryId => {
  const res = await fetch('http://localhost:3000/todos/' + categoryId)
  return res.json()
}

const createNewTodo = async todo => {
  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    return response.json()
  } catch (err) {
    return 'could not post Todo, ' + err
  }
}

const createNewCategory = async category => {
  try {
    const response = await fetch('http://localhost:3000/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    return response.json()
  } catch (err) {
    return 'could not post Category, ' + err
  }
}

const editCategory = async category => {
  try {
    const response = await fetch(
      'http://localhost:3000/category/' + category.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: category.name }),
      }
    )
    return response.json()
  } catch (err) {
    return 'could not post Category, ' + err
  }
}

const deleteTask = async todoId => {
  try {
    const response = await fetch(
      'http://localhost:3000/todos/' + todoId.todoId,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.json()
  } catch (err) {
    return 'could not post Category, ' + err
  }
}

export {
  createNewTodo,
  fetchTodos,
  fetchCategories,
  createNewCategory,
  fetchTodosByCategoryId,
  deleteTask,
  editCategory,
}
