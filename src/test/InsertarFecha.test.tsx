import { IconButton } from '@material-ui/core';
import { assert, expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SiririEditor from '../SiririEditor';
import { Editor, convertToRaw } from 'draft-js';
import { dateFormatter } from './utils';
// @ts-ignore
import { draftToMarkdown } from  'markdown-draft-js' ;

describe('<SiririEditor />', () => {


    it('Deberia llamar a fecha/hoy', async () => {
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

    //  it('should call save', () => {
    //     // setup
    //     const saveSpy = spy();
    //     const component = <SiririEditor onSave={saveSpy} />;
    //     const wrapper = mount(component);
    //     const saveButton = wrapper.find(IconButton).filterWhere((button: any) => {
    //         return button.prop('aria-label') === 'Save';
    //     });
    //     assert.strictEqual(saveButton.length, 1);
    //     // estimulo
    //     saveButton.first().simulate('mousedown');
    //     // verificacion
    //     assert.isTrue(saveSpy.called);
    // });

});
