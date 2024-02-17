import { createContext, useState } from "react";

export let TokenContext=createContext();

export default function TokenContextProvider(props){
console.log('====================================');
console.log(props);
console.log('====================================');
const [token,setToken]=useState(null)

return <TokenContext.Provider value={{token,setToken}}>
{props.children}
</TokenContext.Provider>

}
