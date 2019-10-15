// 前端
// dom
import MarkdownIt from 'markdown-it';
import Enzyme,{ render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SupportReactComponent } from '../index';
import React from 'react';
import { getSimpleInput,wrapperId } from './util';
import * as funcs from '../lib/func';

funcs.getWrapperId = () => wrapperId;

Enzyme.configure({ adapter: new Adapter() })
const Hello = (props) => <div>{props.text} world!</div>;
const md = new MarkdownIt({
    breaks: true,
    html: true
}).use(SupportReactComponent, {
    sandbox: {
        React,
        Array: {
            isArray: Array.isArray
        },
        Hello
    }
});
describe('render', () => {
    it('should support render', (done) => {
        document.body.innerHTML = `<div id="${wrapperId}"></div>`
        const html = md.render(getSimpleInput('component'));
        const wrapper = render(
            <div dangerouslySetInnerHTML={{ __html: html }}></div>,
        );
        expect(wrapper).toMatchSnapshot();
        setTimeout(()=>{
            done();
        },100)
    });
});