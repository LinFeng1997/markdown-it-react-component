# markdown-it-react-component
Plugin to support react component for markdown-it markdown parser

With this plugin you can support react component like:

```
\`\`\` rc
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
\`\`\`
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
    - babelOptions - optional,Babel Options,defalut:
    ```
    {
      presets: ['stage-3', 'react', 'es2015'],
      plugins: ['filterXSS']
    }
    ```

### Params

## Example
run `npm run storybook`

## License

[MIT](https://github.com/LinFeng1997/markdown-it-react-component/blob/master/LICENSE) 