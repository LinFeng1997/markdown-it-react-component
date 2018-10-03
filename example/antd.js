import MarkdownIt from "markdown-it";
import { SupportReactComponent } from "../index";
import Button from "antd/es/button";
import 'antd/es/button/style/index.css';

const md = new MarkdownIt().use(SupportReactComponent, {
    components: {
        Antd: {
            Button
        }
    }
})

const str = `
::: rc
const { Button } = Antd;
return (
    <div>
        <Button type="primary">
            Click me!
        </Button>
    </div>
);
:::
`
document.getElementById('antd').innerHTML = str

let html = md.render(str)

document.getElementById('antd').innerHTML = html
