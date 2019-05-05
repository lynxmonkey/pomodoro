import React from 'react'
import styled, { withTheme } from 'styled-components'

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

const UsersHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  color: ${p => p.theme.color.moreSecondaryFont};
`

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  color: ${p => p.highlight ? p.theme.color.primary : p.theme.color.mainFont};
`

const Place = styled.div`
  width: 60px;
`

const Name = styled.div`
  width: 100%;
`

const Average = styled.div`
  min-width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Line = styled.div`
  margin-top: 2px;
  height: 4px;
  border-radius: 2px;
  width: 100%;
`

const MS_IN_WEEK = 604800000

class Scoreboard extends React.Component {
  render() {
    const { topWeeklyUsers, theme, token, lastScoreboardUpdate, id } = this.props
    if (!topWeeklyUsers || !topWeeklyUsers.length) return null
    
    const users = topWeeklyUsers.slice(0, WEEKLY_TOP_ROWS_NUMBER)
    const Users = () => users.map((u, index) => {
      const percent = (u.total / users[0].total) * 100
      const background = `linear-gradient(to right, ${theme.color.primary} ${percent}%, ${theme.color.default} ${percent}%`
      const time = secondsFormatter(u.total / 7)
      return (
        <UserContainer key={index}>
          <UserRow highlight={u.id === id}>
            <Place>{index + 1}</Place>
            <Name>{u.name}</Name>
            <Average><p>{time}</p></Average>
          </UserRow>
          <Line style={{ background }}/>
        </UserContainer>
      )
    })

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
        <UsersHeader>
          <Place>#</Place>
          <Name>NAME</Name>
          <Average>AVERAGE</Average>
        </UsersHeader>
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
  withTheme(Scoreboard)
)