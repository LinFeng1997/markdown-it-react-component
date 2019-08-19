# Example

usage:
```javascript
import MarkdownIt from 'markdown-it';
import { SupportReactComponent } from '../index';
const md = new MarkdownIt().use(SupportReactComponent);
```

### Input
```` js
```rc
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
```
````

### Output
``` rc
const { useState } = React;
function Hello(props){
    const [count,setCount] = useState(0);
    return (
        <div>
            Hello:
            <p onClick={() => setCount(count + 1)} style={{color:'red'}}>{props.text}{count}</p>
        </div>
    )
}
return (
    <div>
        <Hello text="World"/>
    </div>
);
```