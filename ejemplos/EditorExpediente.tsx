import React from 'react';
// @ts-ignore
import { JSONEditor } from 'react-json-editor-viewer';
import { Grid, Typography } from '@material-ui/core';

const expedienteEjemplo = {
    actora: 'JUAN PEREZ',
    demandada: 'LEX CORP SA',
    justiciables: [
      {
        apellidos: 'PEREZ',
        nombres: 'JUAN',
        caracter: 'ACTORA',
        abogados: {
          nombre_completo: 'GOLDMAN, SALUL'
        }
      },
      {
        apellidos: 'LEX CORP SA',
        caracter: 'DEMANDADA',
        abogados: {
          nombre_completo: 'PEREZ, JUAN'
        }
      }
    ]
  };

const EditorExpediente = () => {
  return (
    <Grid container direction='column' style={{ padding: '2em' }}>
      <Grid item>
        <Typography variant='h3'> Expediente</Typography>
      </Grid>
      <Grid item>
        <JSONEditor
          data={expedienteEjemplo}
          collapsible
        />
      </Grid>
    </Grid>
  );
};

export default EditorExpediente;
