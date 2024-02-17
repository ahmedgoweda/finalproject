import { createContext, useState } from "react";


 export let CounterContext= createContext()

 export default function CounterContextProvider(props){
console.log(props.childern);
const [counter,setCoutner]=useState(20)

    return<CounterContext.Provider value={{counter,setCoutner}}>
{props.children}
    </CounterContext.Provider>

    
 }