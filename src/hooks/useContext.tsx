import { createContext, useState } from "react"
import { useEffect } from "react"

export const DataContext = createContext<any>(null)

export const DataProvider: React.FC<{children: React.ReactNode }> = ({children}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [booksData, setBooksData] = useState()
  const [userInfo, setUserInfo] = useState()
  const [signCurrentState, setSignCurrentState] = useState<string>('Login')
  const [tokenCredential, setTokenCredential] = useState<string>()
  const [refreshTokenCall, setRefreshTokencall] = useState<boolean>()

  useEffect(()=> {
    const token = localStorage.getItem('Token');
    if (token !== null) {
      setTokenCredential(token);
    }

  },[])



  const VALUES = {
    searchValue, setSearchValue,
    booksData, setBooksData,
    userInfo, setUserInfo,
    signCurrentState, setSignCurrentState,
    tokenCredential, setTokenCredential, 
    refreshTokenCall, setRefreshTokencall,
    
  }


  return <DataContext.Provider value={VALUES}>
    {children}
  </DataContext.Provider>
}