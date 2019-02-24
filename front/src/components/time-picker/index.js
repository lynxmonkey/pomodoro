import React from 'react'
import styled from 'styled-components'

import { togglePromote } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Time from '../time'
import Panel from '../panel'
import StatisticsPanel from '../statistics-panel'
import PlaceHolder from '../timeline-wrapper'
import Page from '../page'
import Center from './center'
import Mobile from './mobile'


const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Right = styled(Side)`
  align-items: flex-start;
`

const Left = styled(Side)`
  align-items: flex-end;
`

const MEDIUM_WIDTH = 1540
const MOBILE_WIDTH = 800

class Component extends React.Component {
  render() {
    const { pageWidth } = this.props

    if (pageWidth < MOBILE_WIDTH) {
      return <Mobile/>
    }
    if (pageWidth < MEDIUM_WIDTH) {
      return (
        <Page>
          <Right>
            <Panel/>
            <StatisticsPanel/>
          </Right>
          <Center>
            <Time showLastSet mobile/>
          </Center>
        </Page>
      )
    }

    return (
      <Page>
        <Right>
          <Panel/>
          <PlaceHolder/>
        </Right>
        <Center/>
        <Left>
          <Time showLastSet />
          <StatisticsPanel/>
        </Left>
      </Page>
    )
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick)
  }

  onClick = () => {
    const { promoting, togglePromote } = this.props
    if (promoting) {
      togglePromote()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick)
  }
}

const ConnectedComponent =  connectTo(
  state => ({
    ...takeFromState(state, 'generic', ['promoting', 'pageWidth']),
  }),
  {
    togglePromote
  },
  Component
)

export default ConnectedComponent

// import { Authenticator } from 'aws-amplify-react/dist/Auth'

// const federated = {
//   google_client_id: '1014540554504-pn7mcbh6vp7dhm67nuo41n4n0e8ce500.apps.googleusercontent.com',
//   facebook_app_id: '356315411761615' 
// }

// const signUpFields = {
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: 'Email',
//       key: 'email',
//       required: true,
//       placeholder: 'Email',
//       type: 'email',
//       displayOrder: 1
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       placeholder: 'Password',
//       type: 'password',
//       displayOrder: 2
//     }
//   ]
// }

// const signUpConfig = {
//   hideAllDefaults: true,
//   signUpFields,
//   signInFields: signUpFields
// }

// export default () => (
//     <Authenticator
//       federated={federated}
//       signUpConfig={signUpConfig}
//     />
// )