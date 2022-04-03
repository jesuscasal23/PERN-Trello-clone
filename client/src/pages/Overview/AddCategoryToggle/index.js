import React, { useState, useRef, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createNewCategory, editCategory } from '../../../api'
import { Button, Card, Input, Row } from 'antd'
import { AddTaskText } from '../../../sharedStyledComponents'
import OutsideClickHandler from 'react-outside-click-handler'

const AddCategoryToggle = ({ categoryName, categoryId }) => {
  const [isActive, setIsActive] = useState(false)
  const [newCategoryValue, setNewCategoryValue] = useState()
  const addCategoryInput = useRef(null)

  const queryCache = useQueryClient()
  const addCategory = useMutation(createNewCategory, {
    onSuccess: () => {
      queryCache.invalidateQueries('categories')
    },
  })

  const updateCategory = useMutation(editCategory, {
    onSuccess: () => {
      queryCache.invalidateQueries('categories')
    },
  })

  const handleSubmit = () => {
    if (categoryId) {
      updateCategory.mutate({ id: categoryId, name: newCategoryValue })
      setIsActive(false)
      return
    }
    addCategory.mutate({ name: newCategoryValue })
    setIsActive(false)
  }

  useEffect(() => {
    if (isActive && addCategoryInput?.current) {
      addCategoryInput.current.focus()
    }
  }, [isActive])

  if (categoryName && !isActive) {
    return <h3 onClick={() => setIsActive(true)}>{categoryName}</h3>
  }

  if (!isActive) {
    return (
      <AddTaskText onClick={() => setIsActive(true)}>
        Add Category +
      </AddTaskText>
    )
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsActive(false)
        setNewCategoryValue('')
      }}>
      <Card style={{ marginBottom: '10px' }}>
        <Input
          value={newCategoryValue}
          ref={addCategoryInput}
          onChange={e => setNewCategoryValue(e.target.value)}
        />
        <Row>
          <Button
            style={{ margin: '10px 10px 10px 0px' }}
            onClick={handleSubmit}
            disabled={!newCategoryValue}>
            {categoryName ? 'Edit category name' : 'Add category'}
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
export default AddCategoryToggle
