# Antd Example
``` rc
const { Button } = Antd;
const xss = () => {
  console.log('global methods is forbidden');
  alert('xss attack');
};
return (
    <div>
        <Button type="primary" onClick={xss}>
            Click me!
        </Button>
    </div>
);
```