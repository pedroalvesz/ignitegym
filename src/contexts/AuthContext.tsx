import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '@services/api';
import { userDTO } from '@dtos/userDTO';
import { StorageUserSave, StorageUserGet, StorageUserRemove } from '@storage/storageUser';
import { StorageTokenGet, StorageTokenRemove, StorageTokenSave } from '@storage/storageAuthToken'

export type AuthContextDataProps = {
  user: userDTO;
  updateUserProfile: (updatedUser: userDTO) => Promise<void>;
  signIn: ( email: string, password: string ) => Promise<void>;
  signOut: () => Promise<void>;
  LoadingUserData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

//criei o contexto, disse que ele tem a tipagem de authcontextdata props, e começa como um objeto vazio de authcontextdataprops
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


//maneira de criar o componente em outro lugar, não precisando mudar toda a lógica de lugar, somente passando ela como um filho do tipo reactnode (um componente react)
export function AuthContextProvider({children} : AuthContextProviderProps ) {

  const [user, setUser] = useState({} as userDTO);
  const [LoadingUserData, setLoadingUserData] = useState(Boolean)


  async function userAndTokenUpdate(userData: userDTO, token: string) {
      //Definindo que iremos anexar o token em todas as requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
  }

  async function updateUserProfile(updatedUser: userDTO) {
    try {
      setUser(updatedUser)
      await StorageUserSave(updatedUser)
    } catch (error) {
      throw error
    }
  }

   async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {email, password})
      
      if(data.user && data.token) {
        setLoadingUserData(true)

        await StorageUserSave(data.user)
        await StorageTokenSave(data.token)

        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      //throw joga (o erro) no local onde está sendo chamada a função
      throw error
    } finally {
      setLoadingUserData(false)
    }
  }

  async function signOut() {
    try {
      setLoadingUserData(true)

      setUser({} as userDTO)
      await StorageUserRemove()
      await StorageTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setLoadingUserData(false)
    }
  }

  async function loadUserData() {
    try {
      setLoadingUserData(true)

      const userLogged = await StorageUserGet()
      const token = await StorageTokenGet()
  
      if(userLogged && token) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  },[])

  return(
    <AuthContext.Provider value={{ user, signIn, signOut, LoadingUserData, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}