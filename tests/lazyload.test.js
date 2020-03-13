/**
 * @jest-environment node
 */
import React from 'react';
import MarkdownIt from 'markdown-it';
import {SupportReactComponent} from '../index';
import {getResult, wrapperId, getSimpleInput} from './util';
import * as funcs from '../lib/func';
import { LazyLoadComponent,preloadAll } from './Lazyload';

const Hello = LazyLoadComponent(() => import('./spec/Hello'));
funcs.getWrapperId = () => wrapperId;
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
    },
    allowErrorLog: true
});

/**
 * only require other specs here
 */
describe('markdown-it-react-component', () => {
    it('react code should be render', (done) => {
        preloadAll().then((...args) => {
            console.info('preloadAll\n\n',args)
            const html = md.render(getSimpleInput('component'));
            expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
            done();
        }).catch(e =>{
            console.error(e);
        })
    });
});
