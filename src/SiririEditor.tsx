import { createStyles, IconButton } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { EditorState, Modifier, convertToRaw } from 'draft-js';
import MUIRichTextEditor from 'mui-rte';
import React, { useState } from 'react';
import { dateFormatter } from './test/utils';


const styles = () => createStyles({
    root: {
    },
});

type TSiririProps = {
    onSave?: () => void
}

const CallbackComponenFecha = (props: any) => {
    // tslint:disable-next-line:no-console
    return (
        <IconButton aria-label='fecha' onMouseDown={props.onMouseDown}>
            <CalendarToday />
        </IconButton>
    )
}
const comandos = [
    {
        nombre: 'insertar-fecha',
        keyBinding: 70, // F
        toolbarComponente: CallbackComponenFecha,
        call: (editorState: EditorState) => {
            console.log('##########################insertar-fecha')
            // tslint:disable-next-line:no-console
            const fechaActual = dateFormatter(Date.now())
            const currentContent = editorState.getCurrentContent()
            const currentSelection = editorState.getSelection()

            const newContent = Modifier.replaceText(
                currentContent,
                currentSelection,
                fechaActual,
            )

            const newEditorState = EditorState.push(
                editorState,
                newContent,
                'insert-characters',
            )
            return newEditorState
        }
    }
]

const SiririEditor = (props: TSiririProps) => {
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { onSave } = props

    return (
        <div>
        <input onKeyPress={() => console.log('se llamo al keydown')}></input>
        <MUIRichTextEditor onSave={onSave}
            controls={[
                'bold',
                'italic',
                'underline',
                'quote',
                'clear',
                'save',
                'insertar-fecha'
            ]}
            keyCommands={
                comandos
                .filter(comando => comando.keyBinding)
                .map(comando => (
                {
                    key: comando.keyBinding,
                    name: comando.nombre,
                    callback: comando.call

                }
            ))}
            customControls={
                comandos
                    .filter(comando => comando.toolbarComponente)
                    .map(comando => (
                        {
                            name: comando.nombre,
                            component: comando.toolbarComponente,
                            type: 'callback',
                            onClick: comando.call,
                        }
                    ))
                // [
                // ]
            } />
            </div>
    );
};


export default SiririEditor;
