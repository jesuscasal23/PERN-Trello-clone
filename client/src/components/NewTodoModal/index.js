import React from 'react'
import { Modal, Form, Input, Row, Button, Divider } from 'antd'
import { createNewTodo } from '../../api'
import { useMutation, useQueryClient } from 'react-query'

const NewTodoModal = ({ isOpen, setIsOpen, categoryId }) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()
  const addTodo = useMutation(createNewTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const handleSave = () => {
    const formValues = formInstance.getFieldsValue('')
    addTodo.mutate({ ...formValues, list_order: 3, categoryId })
    formInstance.resetFields()
    setIsOpen(false)
  }

  return (
    <Modal
      visible={isOpen}
      footer={null}
      onCancel={() => setIsOpen(false)}
      closable={false}>
      <Form form={formInstance}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Create new todo
        </h2>
        <Form.Item label='description' name='description'>
          <Input />
        </Form.Item>
      </Form>
      <Divider style={{ margin: '0 0 20px 0' }} />
      <Row justify='space-between'>
        <Button type='secondary' onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type='primary' onClick={handleSave}>
          Save
        </Button>
      </Row>
    </Modal>
  )
}

export default NewTodoModal
