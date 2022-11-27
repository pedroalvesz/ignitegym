import { NativeBaseProvider, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';


import { Loading } from '@components/Loading';
import { theme } from './styles/theme';
import { SignUp } from '@screens/SignUp';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
  
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
      barStyle={'light-content'}
      translucent
      />
      {fontsLoaded ? <SignUp/> : <Loading/>}
    </NativeBaseProvider>
  );
}
