import { useNavigation } from '@react-navigation/native'
import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base'


import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { SubmitButton } from '@components/SubmitButton'

export function SignUp() {

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700">
        <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="People Training"
        resizeMode="contain"
        position="absolute"
        />

        <Center mt={24} mb='90px'>
          <LogoSvg/>
          <Text fontFamily="body" fontSize="sm" color="gray.100">Your mind and body in shape</Text>
        </Center>

        <Center px={7}>

          <Heading fontFamily='heading' color='gray.100' mb={4}>
            Register your account
          </Heading>

          <Input 
          placeholder='Username'
          autoCapitalize='none'
          />
          
          <Input 
          placeholder='E-mail'
          keyboardType='email-address'
          autoCapitalize='none'
          />

          <Input 
          placeholder='Password'
          autoCapitalize='none'
          secureTextEntry
          />

          <Input
          placeholder='Confirm password'
          autoCapitalize='none'
          secureTextEntry
          />
          <SubmitButton name='Register and Enter' mt={4} mb="78"/>

          <SubmitButton variant="outline" name='Go back to login' onPress={handleGoBack}/>
        </Center>

      </VStack>
    </ScrollView>
  )
}