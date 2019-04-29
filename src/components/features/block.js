import React from 'react'
import styled from 'styled-components'
import { centerContentStyle } from 'increaser-components';

const Container = styled.div`
  border-radius: 5px;
  color: ${p => p.theme.color.mainFont};
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.color.default};
  padding: 20px;
  margin-bottom: 20px;
  width: 400px;
  @media (max-width: 420px) {
    width: 100%;
  }
`

const UpText = styled.div`
  ${centerContentStyle};
  flex-direction: column;
  margin: 10px;
`

const Header = styled.h3`
  text-align: center;
`

export default ({ children, mainText, secondaryText }) => (
  <Container>
    <UpText>
      <Header>{mainText}</Header>
      <p>{secondaryText}</p>
    </UpText>
    {children}
  </Container>
)