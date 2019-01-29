import React from 'react'
import { Tags, Tag, Heading } from "bulma-styled-components";

type Props = {
  options: string[]
  value: string[]
  onChange: (selections: string[]) => void
  label?: string
}

export class TagSelect extends React.PureComponent<Props> {

  select = (option: string) => {
    const { onChange, value } = this.props
    const i = value.findIndex((opt) => opt === option)
    if (i < 0) {
      onChange && onChange(value.concat(option))
    } else {
      value.splice(i, 1)
      onChange && onChange([...value])
    }
  }

  render() {
    const { options, value, label } = this.props
    return (
      <>
        {label && <Heading>{label}</Heading>}
        <Tags>
          {options.map((option) => {
            return (
              <Tag
                key={option}
                className={`is-rounded ${value.includes(option) ? 'is-info' :''}`}
                onClick={() => this.select(option)}
              >{option}</Tag>
            )
          })}
        </Tags>
      </>
    )
  }
}
