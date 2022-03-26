import React, { useState, useRef, useEffect } from 'react'
import { AddTaskText } from './styledComponents'
import { Card, Row, Input, Button } from 'antd'

const AddEntryToggle = ({ onSubmit }) => {
  const [isActive, setIsActive] = useState(false)

  const addTaskInput = useRef(null)
  const ToggleContainer = useRef(null)

  useEffect(() => {
    if (isActive) {
      addTaskInput.current.focus()
    }
  }, [isActive])

  if (!isActive) {
    return (
      <AddTaskText onClick={() => setIsActive(true)}>add Task +</AddTaskText>
    )
  }

  return (
    <div
      ref={ToggleContainer}
      onBlur={e => {
        console.log(
          'on blur was executed',
          ToggleContainer.current,
          e.target,
          'element that was clicked is inside container',
          ToggleContainer.current.contains(e.target)
        )
        if (!ToggleContainer.current.contains(e.target)) {
          setIsActive(false)
        }
      }}>
      <Card style={{ marginBottom: '10px' }}>
        <Input ref={addTaskInput} />
        <Row>
          <Button
            style={{ margin: '10px 10px 10px 0px' }}
            onClick={() => console.log(addTaskInput)}>
            Add task
          </Button>
          <p
            style={{ marginTop: '20px', cursor: 'pointer' }}
            onClick={() => setIsActive(false)}>
            X
          </p>
        </Row>
      </Card>
    </div>
  )
}

export default AddEntryToggle
