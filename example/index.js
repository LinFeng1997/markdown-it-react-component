import MarkdownIt from "markdown-it";
import { SupportReactComponent } from "../index";

const md = new MarkdownIt().use(SupportReactComponent)

const str = `
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
`
document.getElementById('target').innerHTML = str

let html = md.render(str)

document.getElementById('target').innerHTML = html
