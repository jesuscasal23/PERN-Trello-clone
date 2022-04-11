import React from 'react'
import { Row } from 'antd'
import { useQuery } from 'react-query'
import { Scrollbars } from 'react-custom-scrollbars'
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
      <Scrollbars style={{ width: '99%', height: '90vh' }}>
        <Row
          wrap={false}
          style={{
            marginLeft: '20px',
          }}>
          {categories.data.map(category => {
            return (
              <Scrollbars
                key={category.id}
                style={{
                  height: '89vh',
                  width: '300px',
                  marginRight: '20px',
                  minWidth: '270px',
                }}>
                <TaskContainer>
                  <AddCategoryToggle
                    categoryName={category?.name}
                    categoryId={category.id}
                  />
                  <TodosList categoryId={category.id} />
                </TaskContainer>
              </Scrollbars>
            )
          })}
          <div style={{ minWidth: '270px' }}>
            <TaskContainer>
              <AddCategoryToggle />
            </TaskContainer>
          </div>
        </Row>
      </Scrollbars>
    </Layout>
  )
}

export default Overview
