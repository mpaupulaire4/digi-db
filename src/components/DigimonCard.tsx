import React, { PureComponent } from "react";
import { Link } from 'react-router-dom'
import { Box, Image } from 'bulma-styled-components'

type Props = {
  digimon: {
    id: number,
    name: string,
    image: string,
  },
  size?: 16 | 24 | 32 | 48 | 64 | 96 | 128,
  link?: boolean
  nameless?: boolean
}

export class DigimonCard extends PureComponent<Props> {
  static defaultProps = {
    size: 96
  }
  render() {
    const { digimon, link, size, nameless } = this.props
    return  (
        // @ts-ignore
        <Box as={link ? Link : undefined} to={`/digimon/${digimon.id}`} className="is-paddingless has-background-grey-lighter is-clipped" style={{margin: 5, maxWidth: size }} >
          <Image className={`is-${size}x${size}`}>
            <img src={digimon.image} alt="digimon"/>
            {!nameless && (
              <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(70, 70, 70, .7)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }} className="has-text-white has-text-centered is-size-7" >
                {digimon.name}
              </div>
            )}
          </Image>
        </Box>
    )
  }
}