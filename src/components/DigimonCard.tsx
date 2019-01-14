import React, { PureComponent } from "react";
import { Box, Image } from 'bulma-styled-components'

type Props = {
  digimon: {
    name: string,
    image: string,
  },
  onClick?: () => any,
  href?: string
}

export class DigimonCard extends PureComponent<Props> {
  static defaultProps = {
    digimon: {
      name: 'Kuramon',
      image: 'http://digidb.io/images/fieldguide/field629.png'
    }
  }
  render() {
    const { digimon, onClick, href } = this.props
    return  (
        <Box as={(onClick || href) && "a"} className="is-paddingless has-background-grey-lighter is-clipped" style={{margin: 5}} onClick={onClick}>
          <Image className="is-96x96">
            <img src={digimon.image} alt="digimon"/>
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
          </Image>
        </Box>
    )
  }
}