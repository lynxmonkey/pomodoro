import styled from 'styled-components'

export default styled.div`
  background-color: ${p => p.theme.color.default};
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    background-color: ${p => p.theme.color.primary};
  }
`
