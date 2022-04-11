import React from 'react'
import { Row } from 'antd'
import { useQuery } from 'react-query'
import { Scrollbars } from 'react-custom-scrollbars'
import { fetchCategories } from '../../api'
import {
  TaskContainer,
  HorizontalScrollbar,
  VerticalScrollbar,
} from './styledComponents'

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
      <HorizontalScrollbar style={{ width: '99%', height: '90vh' }}>
        <Row
          wrap={false}
          style={{
            marginLeft: '20px',
          }}>
          {categories.data.map(category => {
            return (
              <VerticalScrollbar
                key={category.id}
                style={{
                  height: '89vh',
                }}>
                <TaskContainer>
                  <AddCategoryToggle
                    categoryName={category?.name}
                    categoryId={category.id}
                  />
                  <TodosList categoryId={category.id} />
                </TaskContainer>
              </VerticalScrollbar>
            )
          })}
          <div style={{ minWidth: '270px' }}>
            <TaskContainer>
              <AddCategoryToggle />
            </TaskContainer>
          </div>
        </Row>
      </HorizontalScrollbar>
    </Layout>
  )
}

export default Overview
