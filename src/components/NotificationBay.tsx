import React from 'react'
import { Notification } from 'bulma-styled-components'
import { NotificationService } from '../services/Notification';

type State = {
  notes:  string[]
}

export class NotificationBay extends React.PureComponent {
  state: State = {
    notes: []
  }

  destroy = () => {
    this.setState({
      notes: this.state.notes.slice(0, this.state.notes.length - 1)
    })
  }

  componentDidMount() {
    NotificationService.subscribe((text) => {
      this.setState({
        notes: this.state.notes.concat(text)
      })
    })
  }

  render() {
    return (
      <div style={{ position: 'fixed', right: 10, left: 10, bottom: 10 }}>
        {this.state.notes.map((note, i) => (
          <Notification
            key={i}
            className="is-info is-size-7"
            onClick={this.destroy}
          >{note}</Notification>
        ))}
      </div>
    )
  }
}