

interface Options {
    multiple: boolean | false
}

type RuleInfo  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string
}

export interface Rules  extends Record<any, RuleInfo>{}

export const Required: boolean = true;
export const Email: boolean = true;
export const minLength = (min: number) => min;

const isEmail = (email: string): boolean => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return emailRegex.test(email)
}

const $errorMessage = (field: string, suffix?: string) => {
    return String(field).replace(String(field).charAt(0), String(field).charAt(0).toUpperCase()) + (suffix ? suffix : " is invalid");
}


function useValidate(Options: Options){

        
    return (errorStateFC: Function, stateErrorValue: any, stateValue: any): boolean => {

        let canSubmit: boolean = true;
        let stateEntries = Object.keys(stateValue);

        if (stateEntries.length <= 0) {
            throw new Error("no field detected in state")
        }

        for (const field of stateEntries) {
            
                
            if ('Email' in stateErrorValue[field]) {

                if ((stateValue as any)[field] == "") {
                    (stateErrorValue[field] as RuleInfo).$error = true;
                    (stateErrorValue[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (stateErrorValue[field] as RuleInfo).$error = false;
                }

                if (!isEmail((stateValue as any)[field])) {
                    (stateErrorValue[field] as RuleInfo).$error = true;
                    (stateErrorValue[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (stateErrorValue[field] as RuleInfo).$error = false;
                }
            }
            
            

            if ('Required' in stateErrorValue[field]) {
                if ((stateValue as any)[field] == "" || (stateValue as any)[field] == null) {
                    (stateErrorValue[field] as RuleInfo).$error = true;
                    (stateErrorValue[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (stateErrorValue[field] as RuleInfo).$error = false;
                }
            }

            
            
            if ('Length' in stateErrorValue[field]) {
                
                if ((stateValue as any)[field] == "" || (stateValue as any)[field] == null) {
                    (stateErrorValue[field] as RuleInfo).$error = true;
                    (stateErrorValue[field] as RuleInfo).$message = $errorMessage(field);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (stateErrorValue[field] as RuleInfo).$error = false;
                }

                console.log(String(stateValue[field]).length,   stateErrorValue[field], 78)

                if(String(stateValue[field]).length <  Number((stateErrorValue[field] as RuleInfo).Length)){
                    (stateErrorValue[field] as RuleInfo).$error = true;
                    (stateErrorValue[field] as RuleInfo).$message = $errorMessage(field, ` must be equal to or greater than ${Number((stateErrorValue[field] as RuleInfo).Length)}`);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (stateErrorValue[field] as RuleInfo).$error = false;
                }

                

                if(Options.multiple == false) continue;

            }

        }

        errorStateFC({ ...stateErrorValue });
        return canSubmit;
    }
}

export default useValidate;