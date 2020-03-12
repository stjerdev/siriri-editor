class ExpedienteBuilder {
  expedienteBase = {
    actora: 'JUAN PEREZ',
    demandada: 'LEX CORP SA',
    justiciables: [
      {
        apellidos: 'PEREZ',
        nombres: 'JUAN',
        caracter: 'ACTORA',
        abogados: {
          nombre_completo: 'GOLDMAN, SALUL',
        },
      },
    ],
  };

  conJusticiables(justiciables: any[]) {
      this.expedienteBase.justiciables = justiciables
      return this;
  }
  build() {
      return this.expedienteBase
  }
}

const expedienteBuilder = new ExpedienteBuilder()

export default expedienteBuilder;