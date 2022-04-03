import React from 'react'
import { Row } from 'antd'
import { useQuery } from 'react-query'

import { fetchCategories } from '../../api'
import { TaskContainer } from './styledComponents'

import Layout from '../../Layout'
import TodosList from './TodosList'
import AddCategoryToggle from './AddCategoryToggle'

const Overview = () => {
  const { data: categories, status } = useQuery('categories', fetchCategories)

  if (status === ('loading' || 'error')) {
    return <Layout />
  }

  return (
    <Layout>
      <Row
        wrap={false}
        style={{
          marginLeft: '20px',
        }}>
        {categories.data.map(category => {
          return (
            <div>
              <TaskContainer key={category.id}>
                <AddCategoryToggle
                  categoryName={category?.name}
                  categoryId={category.id}
                />
                <TodosList categoryId={category.id} />
              </TaskContainer>
            </div>
          )
        })}
        <div>
          <TaskContainer>
            <AddCategoryToggle />
          </TaskContainer>
        </div>
      </Row>
    </Layout>
  )
}

export default Overview
