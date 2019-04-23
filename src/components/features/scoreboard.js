import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../../utils/generic'
import { WEEKLY_TOP_ROWS_NUMBER } from '../../constants/features'
import * as actions from '../../actions/features'
import { secondsFormatter, getHumanDuration } from '../../utils/time';
import Block from './block'

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${p => p.highlight ? p.theme.color.primary : p.theme.color.mainFont};
  margin-top: 4px;
  color: ${p => p.highlight ? p.theme.color.primary : p.theme.color.mainFont};
`

const Place = styled.div`
  width: 60px;
`

const Name = styled.div`
  width: 100%;
`

const Average = styled.div`
  width: 80px;
`

const MS_IN_WEEK = 604800000

class Scoreboard extends React.Component {
  render() {
    const { topWeeklyUsers, token, lastScoreboardUpdate, id } = this.props
    if (!topWeeklyUsers || !topWeeklyUsers.length) return null
    
    const users = topWeeklyUsers.slice(0, WEEKLY_TOP_ROWS_NUMBER)
    const Users = () => users.map((u, index) => (
      <UserRow key={index} highlight={u.id === id}>
        <Place>{index + 1}.</Place>
        <Name>{u.name}</Name>
        <Average>{secondsFormatter(u.total / 7)}</Average>
      </UserRow>
    ))

    const getSecondaryText = () => {
      if (!token) return 'Sign in and inspire others.'
      return getHumanDuration(
        lastScoreboardUpdate + MS_IN_WEEK,
        'The scoreboard is updating...',
        time => `Next update in ${time}`,
        0
      )
    }
    return (
      <Block
        mainText={'Last Week Top Performers'}
        secondaryText={getSecondaryText()}
      >
        <UsersContainer>
          <Users/>
        </UsersContainer>
      </Block>
    )
  }

  componentDidMount() {
    this.props.requestWeeklyScoreboard()
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'features', ['topWeeklyUsers', 'lastScoreboardUpdate']),
    ...takeFromState(state, 'auth', ['token', 'id']),
  }),
  actions,
  Scoreboard
)