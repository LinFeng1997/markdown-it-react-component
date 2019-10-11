```rc
const x = [].constructor.constructor('alert(2)')();
return <div>hello world!</div>;
```

```rc
const x = []['constructor']['constructor']('alert(2)')();
return <div>hello world!</div>;
```