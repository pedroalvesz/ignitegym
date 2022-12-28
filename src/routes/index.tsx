import { Box, useTheme} from 'native-base'
import { NavigationContainer, DefaultTheme} from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from './app.routes';

import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';

export function Routes() {

  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]
  //basicamente trocando o nome do DefaultTheme do Navigation para adicionar uma cor que já tenho no meu tema

  const { user, LoadingUserData } = useAuth()

  if(LoadingUserData) {
    return <Loading/>
  }

  return(
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes/> : <AuthRoutes/>}
      </NavigationContainer>
    </Box>
  )
}