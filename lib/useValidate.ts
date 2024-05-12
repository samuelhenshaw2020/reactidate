import React from "react";

export interface Options {
    // add extendable = true to be able to provide your own custom conditions
 }

type RuleEntries  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string,
    [key: string]: any
}

export type Rules<T extends string | number | symbol = string> = Record<T, RuleEntries> & {
    [key in T]: RuleEntries;
};

enum R_KEYS {
    Email="Email",
    Required="Required",
    Length="Length",
    Confirm="Confirm"
}

const keyFormatter = (value: string): string => {
    let splitValueWithCapLetter = value.split(/(?=[A-Z]+)/g);
    value = splitValueWithCapLetter.length > 1 
        ? splitValueWithCapLetter.join(" ") 
        : value
    value = value.replace(/_/, " ");
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const isEmpty = (value: string) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export const Required = true;
export const Email = true;
export const Confirm = true;
export const minLength = (min: number) => min;

const isEmail = (email: string): boolean => {
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return emailRegex.test(email)
}

const errorMessage = (key: string, custom_msg?: string) => {
    return keyFormatter(key) + (custom_msg ? custom_msg : " is invalid");
}

const isFieldEmptyOrValid = (rule: Rules , key: string, condition: boolean[], custom_msg?: string): boolean => {
    let status = true;
    rule[key].$error = false;
    (rule[key]).$message = ""
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

export function useValidate(): (ruleCallback:React.Dispatch<any>, ruleState: Rules, valueState: Record<string, string|number|boolean|any>) => boolean{
    
    return (rStateCallback: React.Dispatch<any>, rState: Rules, vState: Record<string, string|number|boolean|any>): boolean => {

        
        const stateEntries = Object.keys(rState)
        const tryOrFail: boolean[] = []

        if (Object.keys(rState).length <= 0) {
            throw new Error("no field detected in state")
        }

        for (const field of stateEntries) {
                let canSubmit: boolean = true

                if (R_KEYS.Required in rState[field]) {
                    canSubmit = isFieldEmptyOrValid(rState, field, [isEmpty(vState[field])])
                    tryOrFail.push(canSubmit);
                }

                if (R_KEYS.Email in rState[field] && canSubmit) {
                    canSubmit =  isFieldEmptyOrValid(
                        rState, 
                        field, 
                        [isEmpty(vState[field]), (isEmail(vState[field]) == false)]
                        )
                    tryOrFail.push(canSubmit);
                }
                
                if (R_KEYS.Length in rState[field] && canSubmit) {
                    canSubmit = isFieldEmptyOrValid(rState, field, [isEmpty(vState[field])])
                    tryOrFail.push(canSubmit);
    
                   canSubmit =  isFieldEmptyOrValid(
                        rState,  
                        field, 
                        [(String(vState[field]).length <  Number((rState[field]).Length))], 
                        ` must be equal to or greater than ${Number((rState[field]).Length)}`
                    );
                    tryOrFail.push(canSubmit);
                   
                }

                if(R_KEYS.Confirm in rState[field]){
                    let canSubmit: boolean  = true
                    const [confirmKey] = Object.keys(rState).filter(f => 
                        f.startsWith("confirm") && f.search(new RegExp(Object.values({field})[0], "i")) !== -1);

                    canSubmit = isFieldEmptyOrValid(rState, field, 
                        [   
                            isEmpty(confirmKey),
                            vState[field] != vState[confirmKey] || (isEmpty(vState[field]) ||  isEmpty(vState[confirmKey]))
                        ]
                    )
                    if(canSubmit == false){
                        rState[confirmKey].$error = true;
                        rState[confirmKey].$message = errorMessage(confirmKey, "Confirm password does not match");
                    }
                    tryOrFail.push(canSubmit)
                }
        }

        rStateCallback({ ...rState });
        return tryOrFail.includes(false) ? false : true;
    }
}

