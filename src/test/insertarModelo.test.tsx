import { dateFormatter } from './utils'
import { expect, assert } from 'chai'
import { AssertionError } from 'assert'
import expedienteBuilder from './expedienteBuilder'

function generarNombreApellidosJusticiables(justiciables: {apellidos: string, nombres: string}[]) {
    let nombresCompletos = justiciables.map(justiciable => `${justiciable.apellidos}, ${justiciable.nombres}`);
    
}

const generarEscritoModelo = (modelo: string, expediente: any) => {
    const primerJusticiable = expediente.justiciables[0]
    // tslint:disable-next-line:no-console
    let escrito = modelo
        .replace(/@137/, dateFormatter(Date.now()))
        
    if (expediente.justiciables.length === 1) {
        escrito = escrito.replace(/#@031#/, `${primerJusticiable.apellidos}, ${primerJusticiable.nombres}`)
    } else {

    }
    escrito = escrito
        .replace(/@137/, dateFormatter(Date.now()))
        .replace(/@031/, `${primerJusticiable.apellidos}, ${primerJusticiable.nombres}`)

    return escrito;
}

describe.only('Insertando modelo', () => {

    it.only('Deberia generar 1 modelo con un justiciable', () => {
        const modelo = 'Crespo @137 El justiciable @031 debe presentarse en el juzgado'
        const expediente = expedienteBuilder.build();
        const expected = 'Crespo ' + dateFormatter(Date.now()) + ' El justiciable PEREZ, JUAN debe presentarse en el juzgado'
        const escrito = generarEscritoModelo(modelo, expediente)

        expect(escrito).equal(expected)
    })
    it.only('Deberia generar 1 modelo con un justiciable con #', () => {
        const modelo = 'Crespo @137 El justiciable #@031# debe presentarse en el juzgado'
        const expediente = expedienteBuilder.build();
        const expected = 'Crespo ' + dateFormatter(Date.now()) + ' El justiciable PEREZ, JUAN debe presentarse en el juzgado'
        const escrito = generarEscritoModelo(modelo, expediente)

        expect(escrito).equal(expected)
    })

    it.only('Deberia generar 1 modelo con varios justiciables', () => {
        const modelo = 'Crespo @137 Los justiciables #@31&# debe presentarse en el juzgado'
        const expediente = expedienteBuilder
            .conJusticiables([
                { apellidos: 'PEREZ', nombres: 'JUAN' },
                { apellidos: 'jusApel', nombres: 'jusNom' }])
            .build();
        const expected = 'hola ' + dateFormatter(Date.now()) + ' El justiciable PEREZ, JUAN y jusApel, jusNom debe presentarse en el juzgado'
        const escrito = generarEscritoModelo(modelo, expediente)

        expect(escrito).equal(expected)
    })

})