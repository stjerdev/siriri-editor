import { IconButton } from '@material-ui/core';
import { assert, expect } from 'chai';
import { mount, shallow } from 'enzyme';
import React from 'react';
import SiririEditor from '../SiririEditor';
import { Editor, convertToRaw } from 'draft-js';
import { dateFormatter } from './utils';
import { spy } from 'sinon'
// @ts-ignore
import { draftToMarkdown } from  'markdown-draft-js' ;

describe('<SiririEditor />', () => {


    it.skip('Deberia llamar a fecha/hoy desde toolbar', async () => {
        // setup
        const expected = dateFormatter(Date.now())

        const component = <SiririEditor />;
        const wrapper = mount(component);
        let editor = wrapper.find(Editor)
        const fechaButton = wrapper.find(IconButton).filterWhere((button) => {
            return button.prop('aria-label') === 'fecha';
        });
        assert.strictEqual(fechaButton.length, 1);

         // tslint:disable-next-line:no-console
        fechaButton.first().simulate('mousedown');
        editor = wrapper.find(Editor)
        // verificacion

        const contentRaw = convertToRaw(editor.prop('editorState').getCurrentContent())
        const content = draftToMarkdown(contentRaw)

        expect(content).to.be.equal(expected)
    });
    it('Deberia llamar a fecha/hoy desde atajo teclado', async () => {
        // setup
        const expected = dateFormatter(Date.now())
        const component = <SiririEditor />;
        const wrapper = mount(component);
        let editor:any = wrapper.find('.public-DraftEditor-content').first()
        // tslint:disable-next-line:no-console
        editor.simulate('focus');
        editor.simulate('keyPress', {
            keyCode: 70,
            metaKey: false, // is IS_OSX=true, this should be true
            ctrlKey: true,
            altKey: false});

        editor = wrapper.find(Editor).first()
        // editor.first().simulate('keydown', { ctrlKey: true, keyCode: 70, which: 27 });
        // editor.simulate('keyDown', {
        //     keyCode: KeyCode,
        //     metaKey: false, // is IS_OSX=true, this should be true
        //     ctrlKey: true,
        //     altKey: false});
        editor.simulate('change');
        editor = wrapper.find(Editor)
        // verificacion
        const contentRaw = convertToRaw(editor.prop('editorState').getCurrentContent())
        const content = draftToMarkdown(contentRaw)
        expect(content).to.be.equal(expected)

    });

    // it('should call save', () => {
    //     // setup
    //     const saveSpy = spy();
    //     const component = <SiririEditor onSave={saveSpy} />;
    //     const wrapper = mount(component);
    //     const editor = wrapper.find('.public-DraftEditor-content')
    //     const saveButton = wrapper.find(IconButton).filterWhere((button: any) => {
    //         return button.prop('aria-label') === 'Save';
    //     });
    //     assert.strictEqual(saveButton.length, 1);
    //     // estimulo
    //     editor.simulate('keyPress', {
    //         keyCode: 83,
    //         metaKey: false, // is IS_OSX=true, this should be true
    //         ctrlKey: true,
    //         altKey: false,
    //       });
    //     // verificacion
    //     assert.isTrue(saveSpy.called);
    // });

});
const simulateKeypress = (element: any, key: string, ctrlKey: boolean) => {
      // tslint:disable-next-line:no-console
      console.log('test****')
        const event = new KeyboardEvent('keypress', {key, ctrlKey});
        // tslint:disable-next-line:no-console
        console.log('Event****', event)
        element.getDOMNode().dispatchEvent(event);
      };
// const simulateKeypress = (element: any, key: string) => {
//     const code = key.charCodeAt(0);
//     const event = new KeyboardEvent('keypress', {key, code, charCode: code, keyCode: code});
//     element.dispatchEvent(event);
//   };