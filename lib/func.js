export function filterXSS() {
  return {
    visitor: {
      Identifier(path) {
        if (path.isIdentifier({ name: 'constructor' })) {
          // console.warn('constructor xss');
          path.node.name = 'x';
        }
        else if (typeof window !== 'undefined' && window[path.node.name]) {
          path.node.name = 'x';
        }
      },
      // Function traverse
      FunctionExpression(path) {
        path.traverse({
          ThisExpression(path) {
            // console.warn('FunctionExpression xss');
            path.remove();
          },
        });
      },
      FunctionDeclaration(path) {
        const funcName = path.node.id.name;

        if (funcName !== 'YMGGKLK') {
          path.traverse({
            ThisExpression(path) {
              // console.warn('FunctionDeclaration xss');
              path.remove();
            },
          });
        }
      },
      ThisExpression() {
        // console.log('this');
      },
      JSXIdentifier(path) {
        if (path.node.name === 'dangerouslySetInnerHTML'){
          path.node.name = 'sanitizition';
        }
      }
    }
  };
}

// compile javascript code with sandbox
export function compileCode(code) {
  code = 'with (sandbox) {' + code + '}';
  const fn = new Function('sandbox', code);
  return (sandbox) => {
    const proxy = new Proxy(sandbox, {
      has() {
        return true; // cheet prop
      },
      get(target, key, receiver) {
        // protect escape
        if (key === Symbol.unscopables) {
          return undefined;
        }
        return Reflect.get(target, key, receiver);
      }
    });
    return fn(proxy);
  };
}

// render react code to dom
export function renderReact(wrapperId, reactCode, sandbox) {
  const __container = document.getElementById(wrapperId);
  if (!__container) {
    return;
  }

  const newSandbox = {
    ...sandbox,
    __container,
  };
  const func = compileCode(reactCode);
  func(newSandbox);
  // style resume
  __container.style.opacity = 1;
}