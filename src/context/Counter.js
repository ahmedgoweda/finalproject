import { createContext, useState } from "react";


 export let CounterContext= createContext()

 export default function CounterContextProvider(props){

const {counter,setCoutner}=useState(20)

    return<CounterContext.Provider value={{counter}}>
{props.childern}
    </CounterContext.Provider>

    
 }