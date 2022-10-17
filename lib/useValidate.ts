
interface Options {
    multiple?: boolean | true
}

type RuleInfo  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string
}


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

        
    return (rulesStateMethod: Function, rulesState: any, valueState: any): boolean => {

        let canSubmit: boolean = true;
        let stateEntries = Object.keys(valueState);

        if (stateEntries.length <= 0) {
            throw new Error("no field detected in state")
        }

        for (const field of stateEntries) {
                
            if ('Email' in rulesState[field]) {

                if ((valueState as any)[field] == "") {
                    (rulesState[field] as RuleInfo).$error = true;
                    (rulesState[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field] as RuleInfo).$error = false;
                }

                if (!isEmail((valueState as any)[field])) {
                    (rulesState[field] as RuleInfo).$error = true;
                    (rulesState[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field] as RuleInfo).$error = false;
                }
            }
            
            

            if ('Required' in rulesState[field]) {
                if ((valueState as any)[field] == "" || (valueState as any)[field] == null) {
                    (rulesState[field] as RuleInfo).$error = true;
                    (rulesState[field] as RuleInfo).$message = $errorMessage(field);
                    canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field] as RuleInfo).$error = false;
                }
            }

            
            
            if ('Length' in rulesState[field]) {
                
                if ((valueState as any)[field] == "" || (valueState as any)[field] == null) {
                    (rulesState[field] as RuleInfo).$error = true;
                    (rulesState[field] as RuleInfo).$message = $errorMessage(field);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field] as RuleInfo).$error = false;
                }

                console.log(String(valueState[field]).length,   rulesState[field], 78)

                if(String(valueState[field]).length <  Number((rulesState[field] as RuleInfo).Length)){
                    (rulesState[field] as RuleInfo).$error = true;
                    (rulesState[field] as RuleInfo).$message = $errorMessage(field, ` must be equal to or greater than ${Number((rulesState[field] as RuleInfo).Length)}`);
                     canSubmit = false;
                    if(Options.multiple == false) break;
                }else{
                    (rulesState[field] as RuleInfo).$error = false;
                }

                

                if(Options.multiple == false) continue;

            }

        }

        rulesStateMethod({ ...rulesState });
        return canSubmit;
    }
}

export default useValidate;