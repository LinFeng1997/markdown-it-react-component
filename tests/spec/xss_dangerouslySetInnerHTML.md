```rc
return <div dangerouslySetInnerHTML={{
                      __html: '<script>alert(2)</script>',
                    }}>hello world!</div>;
```