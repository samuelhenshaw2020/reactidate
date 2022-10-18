import React from "react";
import { FormEvent, useRef, useState } from "react";
import useValidate  from "../lib"



function App() {

  const $validate = useValidate({multiple: true})
  
  const rules = { 
    email: {Required: true, Email: true},
    password: {Required: true},
}



const formdata = useRef({email: "", password: ""});

const [formRules, setFormRules] = useState(rules);
  const Submit = (ev: any) =>{
    ev.preventDefault()
    let valid = $validate(setFormRules, formRules, formdata.current);

  }

  return (
    <main className="w-100 p-sm-5 pt-5">
        <form style={{maxWidth: "350px"}} className="card card-body mx-auto" onSubmit={Submit}>
            <div className="form-group">
                {/* <label className="small tw-font-normal">Username</label> */}
                <input onChange={(e: FormEvent<HTMLInputElement>) => formdata.current.email = e.currentTarget.value} type="email" className={`form-control ${(formRules.email as any).$error ? 'border-danger': ''} tw-rounded-dm tw-py-3 tw-placeholder-slate-400`} placeholder="Username" />
                { !!(formRules.email as any)?.$error  && <span className="small text-danger ">{(formRules.email as any).$message}</span> }
            </div>
            <br />

            <div className="form-group">
                {/* <label className="small tw-font-normal">Username</label> */}
                <input onChange={(e: FormEvent<HTMLInputElement>) => formdata.current.password = e.currentTarget.value} type="password" className={`form-control ${(formRules.password as any).$error ? 'border-danger': ''} tw-rounded-dm tw-py-3 tw-placeholder-slate-400`} placeholder="Username" />
                { !!(formRules.password as any)?.$error  && <span className="small text-danger ">{(formRules.password as any).$message}</span> }
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
