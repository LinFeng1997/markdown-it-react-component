import React from 'react';
import MarkdownIt from 'markdown-it';
import {SupportReactComponent} from '../index';
import {getResult, wrapperId, getSimpleInput, getSimpleResult} from './util';
import * as funcs from '../lib/func';

funcs.getWrapperId = () => wrapperId;
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
    },
    allowErrorLog: true
});
const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

/**
 * only require other specs here
 */
describe('markdown-it-react-component', () => {

    beforeAll(() => {
        window = undefined;
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('react code should be render', () => {
        const html = md.render(getSimpleInput('code'));
        expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
    });

    it('react code include component which in sandbox should be render', () => {
        const html = md.render(getSimpleInput('component'));
        expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
    });

    describe('react_block', () => {
        it('react_block code should be render', () => {
            const html = md.render(getSimpleInput('react_block_code'));
            expect(html).toBe(getSimpleResult('<div>hello world!</div>'));
        });
    });

    describe('react_inline', () => {
        it('react_inline code should be render', () => {
            const html = md.render(getSimpleInput('react_inline_code'));
            expect(html).toBe('<p>a<br>\n' + getSimpleResult('<div>hello world!</div>') + '</p>\n');

            const html2 = md.render(getSimpleInput('error_react_inline_code'));
            expect(errorSpy).toHaveBeenCalled();
            errorSpy.mockRestore();
            expect(html2).toBe('<p>a<br>\n' + getSimpleResult('') + '</p>\n');
        });
    });

    describe('option', () => {
        it('allowErrorLog option should work', () => {
            md.render(getSimpleInput('error_code'));
            expect(logSpy).toHaveBeenCalled();
            logSpy.mockRestore();

            const md2 = new MarkdownIt({
                breaks: true,
                html: true
            }).use(SupportReactComponent, {
                allowErrorLog: false
            });
            md2.render(getSimpleInput('error_code'));
            expect(logSpy).not.toHaveBeenCalled();
            logSpy.mockRestore();
        });

        it('sandbox option should work', () => {
            const md = new MarkdownIt().use(SupportReactComponent, {
                sandbox: {
                    Abc: () => <div>Abc</div>,
                }
            });

            const html = md.render(getSimpleInput('error_code'));
            expect(html).toBe(getResult('rc', '<div>Abc</div>'));
        });
    });

    describe('env', () => {
        it('mdRefs', () => {
            const html = md.render(getSimpleInput('md_refs'), {
                mdRefs: {
                    str1: 'hello',
                    str2: 'world'
                }
            });
            expect(html).toBe(getResult('rc', '<div>hello world!</div>'));
        });

        // it('document', () => {
        //
        // });
    });
});
// xss

// getWrapperId

// 前端
// snapshot

// dom