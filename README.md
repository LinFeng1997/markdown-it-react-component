# markdown-it-react-component
Plugin to support react component for markdown-it markdown parser

With this plugin you can support react component like:

```
::: rc
function Hello(props){
    return (
        <div>
            Hello:
            <p style={{color:'red'}}>{props.text}</p>
        </div>
    )
}
return (
    <div>
        <Hello text="World"/>
    </div>
);
:::
```

## Installation

Only browser:

```bash
$ npm install markdown-it-react-component --save
```

## API

```js
import MarkdownIt from "markdown-it";
import { SupportReactComponent } from "../index";

const md = new MarkdownIt().use(md => SupportReactComponent(md,[, options]))
```

* options:
    - components - optional,React Component to provide plugin.

### Params

## Example
See [markdown-it-react-component-example](https://github.com/LinFeng1997/markdown-it-react-component-example/blob/master/index.js)

### Use Antd React Components

See [markdown-it-react-component-antd-example](https://github.com/LinFeng1997/markdown-it-react-component-example/blob/master/antd.js)

## License

[MIT](https://github.com/LinFeng1997/markdown-it-react-component/blob/master/LICENSE) 