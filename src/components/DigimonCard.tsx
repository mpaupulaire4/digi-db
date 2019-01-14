import React, { PureComponent } from "react";
import { Box, Image } from 'bulma-styled-components'

type Props = {
  digimon: {
    digimon: string,
    image: string,
  },
  onClick?: () => any
}

export class DigimonCard extends PureComponent<Props> {
  static defaultProps = {
    digimon: {
      name: 'Kuramon',
      image: 'http://digidb.io/images/fieldguide/field629.png'
    }
  }
  render() {
    const { digimon } = this.props
    return  (
      <Box style={{ minWidth: 100, maxWidth: 120, padding: 10, margin: 5 }}  >
        <Box className="is-paddingless has-background-grey-lighter">
          <Image className="is-square">
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
              {digimon.digimon}
            </div>
          </Image>
        </Box>
      </Box>
    )
  }
}