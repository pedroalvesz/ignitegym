import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form' 

import { SubmitButton } from '@components/SubmitButton'
import { Input } from '@components/Input'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { AuthRoutesNavigationProps } from '@routes/auth.routes'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


type SignInProps = {
  email: string;
  password: string;
}

const SignInSchema = yup.object({
  email: yup.string().required('Insert your Email').email('Invalid Email.'),
  password: yup.string().required('Insert your password')
})



export function SignIn() {

  const navigation = useNavigation<AuthRoutesNavigationProps>()
  const { control, handleSubmit, formState: {errors} } = useForm<SignInProps>({
    resolver: yupResolver(SignInSchema)
  })

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn(data: SignInProps) {
    console.log(data)
  }

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" pb={16}>
        <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
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

          <Controller
          name='email'
          control={control}
          render={({ field : {onChange, value}}) => (
            <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            />
          )}
          />


          <Controller
          name='password'
          control={control}
          render={({ field : { onChange, value }}) => (
            <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
            />
          )}
          />
          
          
          <SubmitButton name='Login' mb="112" onPress={handleSubmit(handleSignIn)}/>

          <Text mb="3" fontFamily='body' color='gray.100' fontSize='md'>
            Not registered yet ?
          </Text>
          <SubmitButton variant="outline" name='Register' onPress={handleNewAccount}/>
        </Center>

      </VStack>
    </ScrollView>
  )
}