import styled from 'styled-components'

const General = styled.div`
  background: ${p => p.theme.color.pageBackground};
  width: 100%;
`

export const FullSizePageContainer = styled(General)`
  height: 100%;
`

export const ScrollablePageContainer = styled(General)`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const PageContentTopNavigation = styled.div`
  padding: 60px 4% 40px 4%;
  @media (max-width: 400px) {
    padding: 60px 4px 40px 4px;
  } 
`