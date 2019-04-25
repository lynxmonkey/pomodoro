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
  padding: 60px 5% 40px 5%;
`

export const PageContentTopDownNavigation = styled(PageContentTopNavigation)`
  padding-bottom: 140px;
`
