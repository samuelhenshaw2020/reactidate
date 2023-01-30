import React from "react";

type RuleEntries  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string,
    [key: string]: any
}

enum R_KEYS {
    Email="Email",
    Required="Required",
    Length="Length"
}

export interface Options {
   // add extendable = true to be able to provide your own custom conditions
}

export interface Rules  extends Record<string, RuleEntries>{
    [key: string]: RuleEntries 
}

export const Required = true;
export const Email = true;
export const minLength = (min: number) => min;

const isEmail = (email: string): boolean => {
    const emailRegex = new RegExp("/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/");
    return emailRegex.test(email)
}

const errorMessage = (key: string, custom_msg?: string) => {
    return String(key).replace(String(key).charAt(0), String(key).charAt(0).toUpperCase()) + (custom_msg ? custom_msg : " is invalid");
}


const isFieldEmptyOrValid = (rule: Rules , key: string, condition: boolean[], custom_msg?: string): boolean => {
    let status = true;
    rule[key].$error = false;
    for (let index = 0; index < condition.length; index++) {
        if (condition[index]) {
            (rule[key]).$error = true;
            (rule[key]).$message = errorMessage(key, custom_msg);
            status  = false
            break
        }
    }
    return status;
}


export  function useValidate(options?: Options){
    
    return (rStateFunc: React.Dispatch<any>, rState: Rules, vState: Record<string, string|number|boolean|any>): boolean => {

        let canSubmit = true;
        const stateEntries = Object.keys(rState)

        if (Object.keys(rState).length <= 0) {
            throw new Error("no field detected in state")
        }

        for (const field of stateEntries) {
            if (R_KEYS.Email in rState[field]) {
                canSubmit = isFieldEmptyOrValid(rState, field, 
                    [
                        (vState[field] == ""), 
                        (!isEmail(vState[field] as string))
                    ]
                );
            }

            if (R_KEYS.Required in rState[field]) {
                canSubmit = isFieldEmptyOrValid(rState, field, 
                    [
                        (vState[field] == "")
                    ]
                );
            }
            
            if (R_KEYS.Length in rState[field]) {
                
                canSubmit = isFieldEmptyOrValid(rState, field, 
                    [
                        (vState[field] == "")
                    ]
                );

                canSubmit = isFieldEmptyOrValid(rState,  field, 
                    [
                        (String(vState[field]).length <  Number((rState[field]).Length))
                    ], 
                    ` must be equal to or greater than ${Number((rState[field]).Length)}`
                );
            }

        }

        rStateFunc({ ...rState });
        return canSubmit;
    }
}

