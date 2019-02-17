# Antd Example
``` rc
const { Button } = Antd;
const xss = () => {
  alert('xss attack');
  console.log('global methods is forbidden');
};
return (
    <div>
        <Button type="primary" onClick={xss}>
            Click me!
        </Button>
    </div>
);
```