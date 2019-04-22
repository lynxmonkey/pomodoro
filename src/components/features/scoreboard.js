import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../../utils/generic'
import { WEEKLY_TOP_ROWS_NUMBER } from '../../constants/features'
import * as actions from '../../actions/features'
import { secondsFormatter } from '../../utils/time';

const Container = styled.div`
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${p => p.theme.color.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${p => p.theme.color.mainFont};
`

const Header = styled.p`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
  color: ${p => p.theme.color.mainFont};
`

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
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

class Scoreboard extends React.Component {
  render() {
    const { topWeeklyUsers } = this.props
    if (!topWeeklyUsers || !topWeeklyUsers.length) return null
    
    const users = topWeeklyUsers.slice(0, WEEKLY_TOP_ROWS_NUMBER)
    const Users = () => users.map(({ name, total }, index) => (
      <UserRow>
        <Place>{index + 1}.</Place>
        <Name>{name}</Name>
        <Average>{secondsFormatter(total / 7)}</Average>
      </UserRow>
    ))
    return (
      <Container>
        <Header>Last Week Top Performers</Header>
        <UsersContainer>
          <Users/>
        </UsersContainer>
      </Container>
    )
  }
  componentDidMount() {
    this.props.requestWeeklyScoreboard()
  }
}

export default connectTo(
  state => takeFromState(state, 'features', ['topWeeklyUsers']),
  actions,
  Scoreboard
)