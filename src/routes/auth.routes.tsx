import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator<AuthRoutes>();

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';


//com a tipagem das routas, impede erros de tipagem no momento de passar dados entre rotas
type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type AuthRoutesNavigationProps = NativeStackNavigationProp<AuthRoutes>;

export function AuthRoutes(){

  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="signIn" component={SignIn}/>
      <Screen name="signUp" component={SignUp}/>
    </Navigator>
  )
}