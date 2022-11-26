import {VStack, Image, Center, Text, Heading} from 'native-base'


import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { SubmitButton } from '@components/SubmitButton'

export function SignIn() {
  return(
    <VStack flex={1} bg="gray.700">
      <Image 
      source={BackgroundImg}
      alt="People Training"
      resizeMode="contain"
      position="absolute"
      />

      <Center mt={24} mb='160'>
        <LogoSvg/>
        <Text fontFamily="body" fontSize="sm" color="gray.100">Your mind and body in shape</Text>
      </Center>

      <Center px={7}>

        <Heading fontFamily='heading' color='gray.100' mb={4.}>
          Login into your account
        </Heading>

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
        <SubmitButton name='Login' mb="112"/>

        <Text mb="3" fontFamily='body' color='gray.100' fontSize='md'>
          Not registered yet ?
        </Text>
        <SubmitButton variant="outline" name='Register'/>
      </Center>

    </VStack>
  )
}