import { Icon } from "bulma-styled-components";
import React from 'react'

export class FilterIcon extends React.PureComponent<{ onClick?: () => void }> {
  render() {
    const { onClick } = this.props
    return (
      <Icon onClick={onClick} style={{ cursor: 'pointer' }} className="has-text-primary">
        <i className="fas fa-lg fa-sliders-h"/>
      </Icon>
    )
  }
}