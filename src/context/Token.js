import { createContext, useState } from "react";

export let TokenContext=createContext();

export default function TokenContextProvider(propes){

const [token,setToken]=useState(null)

return <TokenContext.Provider value={{token,setToken}}>
{ propes.children}

</TokenContext.Provider>

}
