import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'

export const TaskContainer = styled.div`
  background-color: #eaecf0;
  padding: 10px;
  width: 99%;
  border-radius: 3px;
`
export const VerticalScrollbar = styled(Scrollbars)`
  width: 300px;
  margin-right: 20px;
  min-width: 270px;
`

export const HorizontalScrollbar = styled(Scrollbars)`
  width: 99%;
  height: 90vh;
`
