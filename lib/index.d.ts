declare module "reactidate" {
    
    import React from "react";
    
    type RuleEntries  = {
        Required?: boolean,
        Email?: boolean,
        Length?: number,  
        $error?: boolean ,
        $message?: string
    }
    
    export interface Rules  extends Record<string, RuleEntries>{
        [key: string]: RuleEntries
    }
    
    
    
    export function useValidate(options?: useValidate.Options): (rStateFunc: React.Dispatch<any>, rState: Rules, vState: Record<string, string|number|boolean|any>) => boolean;
    
    namespace useValidate {
        export interface Options {
            // option here    
        }
    }
    
    
    
    export const Email: boolean | true;
    export const Required: boolean | true;
    export function minLength(min:number): number;
    
}