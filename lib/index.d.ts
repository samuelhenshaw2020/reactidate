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



export declare function useValidate(options?: useValidate.Options): (rStateFunc: React.Dispatch<any>, rState: Rules, vState: Record<string, string|number|boolean|any>) => boolean;

declare namespace useValidate {
    export interface Options {
        // option here    
    }
}



export declare const Email: boolean | true;
export declare const Required: boolean | true;
export declare function minLength(min:number): number;
