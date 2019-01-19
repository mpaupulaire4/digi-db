import { Database } from './Database'
import data from './data.json'
import { Digimon, IDigimon } from './Objects';

export function populate(db: Database) {
  db.on('populate', () => {
    console.log('populating')
    try {
      db.digimon.bulkPut(data.digimon.map((digi) => new Digimon(digi as unknown as IDigimon)))
      db.moves.bulkPut(data.moves)
      db.supports.bulkPut(data.supports)
      db.movelearn.bulkPut(data.movelearn)
      db.digivolve.bulkPut(data.digivolve)
    } catch (e) {
      console.log(e)
    }
    console.log('population done')
  })
}
