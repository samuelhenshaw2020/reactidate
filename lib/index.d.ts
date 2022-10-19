import React from "react";

type RuleInfo  = {
    Required?: boolean,
    Email?: boolean,
    Length?: number,  
    $error?: boolean ,
    $message?: string
}



export declare function useValidate(options?: useValidate.Options): (rulesStateMethod: React.Dispatch<any>, rulesState: Record<string, RuleInfo>, valueState: Record<string, string | number>) => boolean;

declare namespace useValidate {
    export interface Options {
        // option here    
    }
}


export interface Rules  extends Record<string, RuleInfo>{
    [key: string]: RuleInfo
}

export declare const Email: boolean | true;
export declare const Required: boolean | true;
export declare function minLength(min:number): number;
