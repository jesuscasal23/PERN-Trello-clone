import React from 'react'
import { Card, Row } from 'antd'
import { fetchTodosByCategoryId, deleteTask } from '../../../api'
import AddEntryToggle from '../AddEntryToggle'
import { useQueryClient } from 'react-query'
import { useQuery, useMutation } from 'react-query'

const TodosList = ({ categoryId }) => {
  const queryCache = useQueryClient()

  const { data: todos, status } = useQuery(['todos', categoryId], () =>
    fetchTodosByCategoryId(categoryId)
  )

  const deleteTaskById = useMutation(deleteTask, {
    onSuccess: () => {
      queryCache.invalidateQueries()
    },
  })

  const handleDeleteTask = todoId => {
    deleteTaskById.mutate({ todoId })
  }

  if (status === 'loading') {
    return <h3>loading...</h3>
  }

  if (status === 'error') {
    return <h3>error fetching data</h3>
  }

  return (
    <>
      {todos.data.map((todo, i) => {
        return (
          <Card style={{ marginBottom: '10px' }} key={todo.id}>
            <Row justify='space-between'>
              <p style={{ margin: 0 }}>{todo.description}</p>
              <p
                style={{ margin: 0 }}
                onClick={() => handleDeleteTask(todo.id)}>
                X
              </p>
            </Row>
          </Card>
        )
      })}

      <AddEntryToggle categoryId={categoryId} />
    </>
  )
}

export default TodosList
