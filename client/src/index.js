import React from 'react'
import ReactDOM from 'react-dom'
import Overview from './pages/Overview/'
import 'antd/dist/antd.css'
import './antdOverwrites.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Overview />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
)
