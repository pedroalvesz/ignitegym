import { createContext, ReactNode, useState } from 'react';

import { api } from '@services/api';
import { userDTO } from '@dtos/userDTO';
import { StorageUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
  user: userDTO;
  signIn: ( email: string, password: string ) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

//criei o contexto, disse que ele tem a tipagem de authcontextdata props, e começa como um objeto vazio de authcontextdataprops
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


//maneira de criar o componente em outro lugar, não precisando mudar toda a lógica de lugar, somente passando ela como um filho do tipo reactnode (um componente react)
export function AuthContextProvider({children} : AuthContextProviderProps ) {

  const [user, setUser] = useState({} as userDTO);

   async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {email, password})
      
      if(data.user) {
        setUser(data.user)
        StorageUserSave(data.user)
      }

    } catch (error) {
      //throw joga (o erro) no local onde está sendo chamada a função
      throw error
    }
  }

  return(
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}