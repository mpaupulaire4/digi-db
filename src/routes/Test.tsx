import React from 'react'
import { Box } from 'bulma-styled-components'

const { Provider, Consumer } = React.createContext({ count: 0})

export class Test extends React.Component {

  render() {
    return (
      <UpdatingDiv>
        <Box>
          <PureDiv>
            <Update />
          </PureDiv>
        </Box>
      </UpdatingDiv>
    )
  }
}

class PureDiv extends React.PureComponent {
  render() {
    return (
      <div>
        <Box>
          <div {...this.props} />
        </Box>
      </div>
    )
  }
}

class Update extends React.Component {

  render() {
    return (
      <Consumer>
        {(count) => <div>{count.count}</div>}
      </Consumer>
    )
  }
}

class UpdatingDiv extends React.Component {
  state = {
    count: 0
  }
  interval: NodeJS.Timeout;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <Provider value={this.state} {...this.props}/>
    )
  }
}