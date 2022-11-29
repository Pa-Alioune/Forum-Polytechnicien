import { createContext, useState } from "react";



export const SelectionContext = createContext();
export const SelectionProvider = ({children})=>{
    const [selections, setSelection] = useState([]);
    const saveSelection = (newSelection)=>{
    setSelection([...selections,newSelection ] )
    }
    const deleteSelection = (index)=>{
        selections.splice(index,1);
        setSelection([...selections] )
        }
    return(
        <SelectionContext.Provider value={{selections,saveSelection,deleteSelection}} >
            {children}
        </SelectionContext.Provider>
    )
}
