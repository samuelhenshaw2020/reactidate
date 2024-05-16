import React from "react";
import { FormEvent, useRef, useState,  } from "react";
import {useValidate, Required, Email, minLength}  from "../lib"



function App() {

  const $validate = useValidate()
  
  const rules = { 
    email: {Required, Email},
    c_password: { Length: minLength(6)}
}

const formdata = useRef({email: "", c_password: "", f: ""});

const [formRules, setFormRules] = useState(rules);
  const Submit = (ev: any) =>{
    ev.preventDefault()
    let valid = $validate(setFormRules, formRules, formdata.current);
    // console.log(valid)

  }

  return (
    <main className="w-100 p-sm-5 pt-5">
        <form style={{maxWidth: "350px"}} className="card card-body mx-auto" onSubmit={Submit}>
            <div className="form-group">
                <input formNoValidate onChange={(e: FormEvent<HTMLInputElement>) => formdata.current.email = e.currentTarget.value} type="email" className={`form-control ${(formRules.email as any).$error ? 'border-danger': ''} tw-rounded-dm tw-py-3 tw-placeholder-slate-400`} placeholder="Username" />
                { !!(formRules.email as any)?.$error  && <span className="small text-danger ">{(formRules.email as any).$message}</span> }
            </div>
            <br />

            <div className="form-group">
                <input onChange={(e: FormEvent<HTMLInputElement>) => formdata.current.c_password = e.currentTarget.value} type="c_password" className={`form-control ${(formRules.c_password as any).$error ? 'border-danger': ''} tw-rounded-dm tw-py-3 tw-placeholder-slate-400`} placeholder="password" />
                { !!(formRules.c_password as any)?.$error  && <span className="small text-danger ">{(formRules.c_password as any).$message}</span> }
            </div>

            <br />
            <div>
              <button className="btn btn-primary">Proceed</button>
            </div>
        </form>
    </main>
  )
}

export default App
