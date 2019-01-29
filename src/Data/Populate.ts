import { Database } from './Database'
import data from './data.json'
import { Digimon, IDigimon, Move } from './Objects';

export function populate(db: Database) {
  db.on('populate', () => {
    console.log('populating')
    try {
      db.digimon.bulkPut(data.digimon as unknown as Digimon[] )
      db.moves.bulkPut(data.moves as Move[])
      db.supports.bulkPut(data.supports)
      db.movelearn.bulkPut(data.movelearn)
      db.digivolve.bulkPut(data.digivolve)
    } catch (e) {
      console.log(e)
    }
    console.log('population done')
  })
}
