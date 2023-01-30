# Reactidate

[![Issues](	https://img.shields.io/github/issues/samuelhenshaw2020/reactidate)](https://github.com/samuelhenshaw2020/reactidate/issues)
[![Forks](	https://img.shields.io/github/forks/samuelhenshaw2020/reactidate)](https://github.com/samuelhenshaw2020/reactidate/network/members)
[![Stars](	https://img.shields.io/github/stars/samuelhenshaw2020/reactidate)](https://github.com/samuelhenshaw2020/reactidate/stargazers)
[![Pull Request](https://img.shields.io/github/issues-pr/samuelhenshaw2020/reactidate)](https://github.com/samuelhenshaw2020/reactidate/stargazers)
[![Stats](https://img.shields.io/github/watchers/samuelhenshaw2020/reactidate)](https://github.com/samuelhenshaw2020/reactidate/stargazers)

> ### React form validator.



<!-- ![](https://github.com/samuelhenshaw2020/reactidate/blob/main/.images/interswitch.png?raw=true)

![](https://github.com/samuelhenshaw2020/reactidate/blob/main/.images/vue-interswitch.png?raw=true) -->

## Installation
To install, run:
```bash
npm install reactidate --save
```

# Usage
Using `reactidate` in react applications is super following the code sample below

```jsx
    import { useRef, useState } from "react";
    import {useValidate, Required, Email, minLength}  from "reactidate";

    function App(){
        const $validate = useValidate({multiple: true})
  
        const rules = { 
            email: {Required, Email},
            password: {Required, minLength: minLength(6)},
        }

        const formdata = useRef({email: "", password: ""});

        const [formRules, setFormRules] = useState(rules);

        const Submit = (ev: any) =>{
            ev.preventDefault()
            let valid = $validate(setFormRules, formRules, formdata.current);
            if(!valid){
                return;
            }
            // other process and api request code
        }

    }
```

> Note: that the code sample above implements the useRef Hook to store the state of the form data. useState can also be used.

The template will look like the code below

```jsx
    <div >
        <input onChange={(e) => formdata.current.email = e.currentTarget.value} type="email" className={formRules.email?.$error ? 'red': ''}  />
        { !!formRules.email?.$error  && <span>{formRules.email?.$message}</span> }
    </div>
```

`useValidate` hook and the `$validate` function call are the two important aspect of the code above.

`useValidate` takes an `options` with the following params

| Params | type | description | 
|--------|:----:|--------:|
| multiple | boolean (default: `true`) | Specifies if validator should stop on error seen for a single form element |
|  |  |  |



 ## License 
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.