import React from 'react';
import * as ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import SiririEditor from '../';
import EditorExpediente from './EditorExpediente';
const App = () => {
  return (
    <Grid container>
      <Grid item>
        <SiririEditor />
      </Grid>
      <Grid item>
        <EditorExpediente></EditorExpediente>
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
