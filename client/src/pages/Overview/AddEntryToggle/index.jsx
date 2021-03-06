import React, { useState, useRef, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useMutation, useQueryClient } from 'react-query'
import { Card, Row, Input, Button } from 'antd'

import { AddTaskText } from '../../../sharedStyledComponents'
import { createNewTodo } from '../../../api'

const AddEntryToggle = ({ categoryId }) => {
  const queryClient = useQueryClient()
  const addTodo = useMutation(createNewTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const [isActive, setIsActive] = useState(false)
  const [newTaskValues, setNewTaskValue] = useState()
  const addTaskInput = useRef(null)

  useEffect(() => {
    if (isActive) {
      addTaskInput.current.focus()
    }
  }, [isActive])

  if (!isActive) {
    return (
      <AddTaskText onClick={() => setIsActive(true)}>Add Task +</AddTaskText>
    )
  }

  const handlesubmit = () => {
    addTodo.mutate({ description: newTaskValues, list_order: 3, categoryId })
    setNewTaskValue('')
    setIsActive(false)
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsActive(false)
        setNewTaskValue('')
      }}>
      <Card style={{ marginBottom: '10px' }}>
        <Input
          value={newTaskValues}
          ref={addTaskInput}
          onChange={e => setNewTaskValue(e.target.value)}
        />
        <Row>
          <Button
            style={{ margin: '10px 10px 10px 0px' }}
            onClick={handlesubmit}
            disabled={!newTaskValues}>
            Add task
          </Button>
          <p
            style={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={() => setIsActive(false)}>
            X
          </p>
        </Row>
      </Card>
    </OutsideClickHandler>
  )
}

export default AddEntryToggle
