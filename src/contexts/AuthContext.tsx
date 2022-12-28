import { userDTO } from '@dtos/userDTO'
import { createContext, ReactNode } from 'react'

export type AuthContextDataProps = {
  user: userDTO;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

//criei o contexto, disse que ele tem a tipagem de authcontextdata props, e começa como um objeto vazio de authcontextdataprops
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


//maneira de criar o componente em outro lugar, não precisando mudar toda a lógica de lugar, somente passando ela como um filho do tipo reactnode (um componente react)
export function AuthContextProvider({children} : AuthContextProviderProps ) {
  return(
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Pedro',
        email: 'pedro@email.com',
        avatar: 'pedro.png',
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}