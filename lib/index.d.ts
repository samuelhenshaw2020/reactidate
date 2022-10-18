
declare module "reactidate" { 

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

    export interface Options {
        multiple?: boolean | true
    }
    

    export const Required: boolean;
    export const Email: boolean;
    export function minLength(min: number): number;

}