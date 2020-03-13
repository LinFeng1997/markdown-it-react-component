import React, { Component } from 'react';
import Loadable from 'react-loadable';

export default function lazyLoad(loader) {
    return Loadable({
        loader,
        loading: <div>loading</div>,
    });
}

export const preloadAll = Loadable.preloadAll;

export function LazyLoadComponent(importFunction) {
    let LazyComponent = 'div';
    return class LazyPage extends Component {
        constructor(props) {
            super(props);
            // importFunction: () => import(path)
            LazyComponent = lazyLoad(importFunction);
            console.info('LazyComponent:',LazyComponent)

            preloadAll().then(...args => {
                console.info('what',args)
            })
        }
        render() {
            return <LazyComponent {...this.props}/>;
        }
    };
}