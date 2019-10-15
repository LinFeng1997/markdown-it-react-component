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
const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

/**
 * only require other specs here
 */
describe('markdown-it-react-component', () => {

    beforeAll(() => {
        window = {
            alert: jest.fn()
        };
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
        });

        it('break line code', () => {
            const html = md.render(getSimpleInput('react_inline_break_line_code'));
            expect(html).toBe('<p>a<br>\n' + getSimpleResult('<div>hello world!</div>') + '</p>\n');
        });

        it('error code', () => {
            const html = md.render(getSimpleInput('error_react_inline_code'));
            expect(errorSpy).toHaveBeenCalled();
            errorSpy.mockRestore();
            expect(html).toBe('<p>a<br>\n' + getSimpleResult('') + '</p>\n');
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

    describe('xss', () => {
        // it('global object', () => {
        //     const alert = jest.fn();
        //     window.alert = alert;
        //     const md = new MarkdownIt().use(SupportReactComponent, {
        //         sandbox: {
        //             alert
        //         }
        //     });
        //     md.render(getSimpleInput('xss'));
        //     expect(alert).toHaveBeenCalled();
        // });
        it('constructor', () => {
            md.render(getSimpleInput('xss_constructor'));
            expect(warnSpy).toHaveBeenCalledWith('constructor xss');
            expect(warnSpy).toHaveBeenCalledWith('constructor str xss');
            expect(warnSpy).toHaveBeenCalledTimes(5);
        });

        it('str constructor', () => {
            md.render(getSimpleInput('xss_constructor_str'));
            expect(warnSpy).toHaveBeenCalledWith('constructor str xss');
        });

        it('this', () => {
            md.render(getSimpleInput('xss_this'));
            expect(warnSpy).toHaveBeenCalledWith('this escape xss attack');
        });

        it('dangerouslySetInnerHTML', () => {
            md.render(getSimpleInput('xss_dangerouslySetInnerHTML'));
            expect(warnSpy).toHaveBeenCalledWith('dangerouslySetInnerHTML xss');
        });
    });
});
// getWrapperId

// 前端
// snapshot

// dom