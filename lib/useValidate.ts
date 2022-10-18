import React from "react";

export interface Options {
    multiple?: boolean | true
}

type RuleInfo  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string
}

export interface Rules  extends Record<string, RuleInfo>{
    [key: string]: RuleInfo
}




export const Required = true;
export const Email = true;
export const minLength = (min: number) => min;

const isEmail = (email: string): boolean => {
    const emailRegex = new RegExp("/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/");
    return emailRegex.test(email)
}

const $errorMessage = (field: string, suffix?: string) => {
    return String(field).replace(String(field).charAt(0), String(field).charAt(0).toUpperCase()) + (suffix ? suffix : " is invalid");
}


export  function useValidate(Options: Options){

        
    return (rulesStateMethod: React.Dispatch<any>, rulesState: Record<string, RuleInfo>, valueState: Record<string, string | number>): boolean => {

        let canSubmit = true;
        const stateEntries = Object.keys(valueState);

        if (stateEntries.length <= 0) {
            throw new Error("no field detected in state")
        }

        for (const field of stateEntries) {
                
            if ('Email' in rulesState[field]) {

                if ((valueState)[field] == "") {
                    (rulesState[field]).$error = true;
                    (rulesState[field]).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field]).$error = false;
                }

                if (!isEmail(valueState[field] as string)) {
                    (rulesState[field]).$error = true;
                    (rulesState[field]).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field]).$error = false;
                }
            }
            
            

            if ('Required' in rulesState[field]) {
                if ((valueState)[field] == "" || (valueState)[field] == null) {
                    (rulesState[field]).$error = true; //changes made here
                    (rulesState[field]).$message = $errorMessage(field);
                    canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field]).$error = false;
                }
            }

            
            
            if ('Length' in rulesState[field]) {
                
                if ((valueState)[field] == "" || (valueState)[field] == null) {
                    (rulesState[field]).$error = true;
                    (rulesState[field]).$message = $errorMessage(field);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field]).$error = false;
                }

                if(String(valueState[field]).length <  Number((rulesState[field]).Length)){
                    (rulesState[field]).$error = true;
                    (rulesState[field]).$message = $errorMessage(field, ` must be equal to or greater than ${Number((rulesState[field]).Length)}`);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field]).$error = false;
                }

                

                if(Options.multiple == false) continue;

            }

        }

        rulesStateMethod({ ...rulesState });
        return canSubmit;
    }
}

