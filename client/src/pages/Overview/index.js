import React, { useState } from 'react'
import TodosList from '../../components/TodosList'
import Layout from '../../components/Layout'
import { Button, Row } from 'antd'
import { TaskContainer } from './styledComponents'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchCategories, createNewCategory } from '../../api'

const Overview = () => {
  const { data: categories, status } = useQuery('categories', fetchCategories)
  const queryCache = useQueryClient()

  const addCategory = useMutation(createNewCategory, {
    onSuccess: () => {
      queryCache.invalidateQueries('categories')
    },
  })

  if (status === ('loading' || 'error')) {
    return <Layout />
  }

  return (
    <Layout>
      <Row
        style={{
          marginLeft: '20px',
        }}>
        {categories.data.map(category => {
          return (
            <TaskContainer key={category.id}>
              <h3>{category.name}</h3>
              <TodosList categoryId={category.id} />
            </TaskContainer>
          )
        })}
        <TaskContainer>
          <Button onClick={() => addCategory.mutate({ name: 'new category' })}>
            Add Category
          </Button>
        </TaskContainer>
      </Row>
    </Layout>
  )
}

export default Overview
