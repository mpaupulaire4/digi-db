import React, { PureComponent, CSSProperties } from "react";
import { Box, Image, Level, Icon } from 'bulma-styled-components'
import { Digimon } from "../Data/Objects";

type Props = {
  digimon: Digimon,
  size?: 16 | 24 | 32 | 48 | 64 | 96 | 128,
  link?: boolean
  nameless?: boolean
  statless?: boolean
}

const TypeMap: { [type: string]: string } = {
  Data: 'fas fa-cube',
  Free: 'fas fa-minus',
  Vaccine: 'fas fa-syringe',
  Virus: 'fas fa-spider',
}

const textMap: { [type: string]: string } = {
  Earth: 'has-text-white-bis',
  Dark: 'has-text-white-bis',
  Fire: 'has-text-white-bis',
  Water: 'has-text-white-bis',
  Plant: 'has-text-white-bis',
}

const Styles: {[name: string]: CSSProperties} = {
  Container: {
    margin: 5,
  },
  ImageBox: {
    position: 'relative',
  },
  NameBanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(70, 70, 70, .7)',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  InfoRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  BoxIcon: { fontSize: '0.6rem' },
  SlotsRow: { display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' },
}

const SlotStyle = { fontSize: '0.5rem', width: '0.70rem', height: '0.5rem' }

export class DigimonCard extends PureComponent<Props> {
  static defaultProps = {
    size: 96
  }
  render() {
    const { digimon, link, size, nameless, statless } = this.props
    return  (
      <Box
        className={`is-paddingless is-clipped has-background-e-${digimon.attribute.toLowerCase()}`}
        style={{...Styles.Container, width: size}}
      >
        <Box
          as={link ? 'a' : undefined}
          href={`#/digimon/${digimon.id}`}
          className="is-paddingless is-marginless has-background-grey-lighter is-clipped"
          style={{ ...Styles.ImageBox, width: size }}
        >
          <Image className={`is-${size}x${size}`}>
            <img src={digimon.image} alt="digimon"/>
            {!nameless && (
              <div style={Styles.NameBanner} className="has-text-white has-text-centered is-size-7" >
                {digimon.name}
              </div>
            )}
          </Image>
        </Box>
        {statless && (
          <div style={Styles.InfoRow}>
            <Icon style={Styles.BoxIcon}>
              <span className="fa-stack">
                <i className="fas fa-stack-2x fa-square"/>
                <i className={`fa-stack-1x has-text-white ${TypeMap[digimon.type]}`}/>
              </span>
            </Icon>
            <div style={Styles.SlotsRow} className={textMap[digimon.attribute]}>
              <Icon style={SlotStyle} >
                <i className={`${digimon.slots >= 1 ? 'fas' : 'far'} fa-square`}/>
              </Icon>
              <Icon style={SlotStyle}>
                <i className={`${digimon.slots >= 2 ? 'fas' : 'far'} fa-square`}/>
              </Icon>
              <Icon style={SlotStyle}>
                <i className={`${digimon.slots == 3 ? 'fas' : 'far'} fa-square`}/>
              </Icon>
            </div>
            <Icon style={Styles.BoxIcon}>
              <span className="fa-stack">
                <i className="fas fa-stack-2x fa-square"/>
                <span className="fas fa-stack-1x has-text-white" children={digimon.memory} />
              </span>
            </Icon>
          </div>
        )}
      </Box>
    )
  }
}