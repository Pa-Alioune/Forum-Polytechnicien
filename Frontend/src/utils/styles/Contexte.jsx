import { createContext, useState } from "react";


// Contexte pour la selection des centres d'intéret par le nouvel utlisateur lors de l'inscription
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
    const viderSelection = ()=>{
        setSelection([]);
    }
    return(
        <SelectionContext.Provider value={{selections,saveSelection,deleteSelection,viderSelection}} >
            {children}
        </SelectionContext.Provider>
    )
}


// Contexte pour une nouvelle question
export const NewQuestionContext = createContext({});
export const NewQuestionProvider = ({children})=>{
    const [ newQuestion, setNewQuestion] = useState({});

    return (
        <NewQuestionContext.Provider value={{newQuestion, setNewQuestion}}>
            {children}
        </NewQuestionContext.Provider>
    )
}

// Contexte pour les données d'authenfication apres connexion (tokenAccess, tokenRefresh)
export const AuthContext = createContext({});
export const AuthProvider = ({children})=>{
    const [ auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const MyQuestion = createContext({});
export const MyQuestionProvider = ({children})=>{
    const [ myQuestion, setMyQuestion] = useState('');

    return (
        <MyQuestion.Provider value={{myQuestion, setMyQuestion}}>
            {children}
        </MyQuestion.Provider>
    )
}

// Contexte pour recuperer un nouvel utilisateur 
export const NewUserContext = createContext({});
export const NewUserProvider = ({children})=>{
    const [ newUser, setNewUser] = useState({});

    return (
        <NewUserContext.Provider value={{newUser, setNewUser}}>
            {children}
        </NewUserContext.Provider>
    )
}