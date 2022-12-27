import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

import { Input } from '@components/Input'
import { SubmitButton } from '@components/SubmitButton'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { api } from '@services/api'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

type SignUpProps = {
  name: string,
  email: string,
  password: string,
  password_confirm: string,
}

const SignUpSchema = yup.object({
  name: yup.string().required('Insert your Name.'),
  email: yup.string().required('Insert your Email.').email('Invalid Email.'),
  password: yup.string().required('Insert your Password').min(8, 'Your password must have at least 8 characters.'),
  password_confirm: yup.string().required('Confirm your password').oneOf([yup.ref('password'), null], 'Your passwords are not the same.')
})

export function SignUp() {

  const navigation = useNavigation()
  const { control, handleSubmit, formState: {errors}} = useForm<SignUpProps>({
    resolver: yupResolver(SignUpSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp( { name, email, password } : SignUpProps) {

    try {
      const response = await api.post('/users', { name, email, password }) 
    } catch (error) {
      
      if(axios.isAxiosError(error)) {
        console.log(error.response?.data)
      }
    }
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

        <Center mt={24} mb='90px'>
          <LogoSvg/>
          <Text fontFamily="body" fontSize="sm" color="gray.100">Your mind and body in shape</Text>
        </Center>

        <Center px={7}>
          <Heading fontFamily='heading' color='gray.100' mb={4}>
            Register your account
          </Heading>


          <Controller
          name='name'
          control={control}
          render={({ field : { onChange, value} }) => (
            <Input 
            placeholder='Name'
            autoCapitalize='none'
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
            />
            )}
          />

          <Controller
          name='email'
          control={control}
          render={({ field : { onChange, value} }) => (
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
          render={({ field : { onChange, value} }) => (
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

        <Controller
          name='password_confirm'
          control={control}
          render={({ field : { onChange, value} }) => (
            <Input
            placeholder='Confirm password'
            autoCapitalize='none'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password_confirm?.message}
            onSubmitEditing={handleSubmit(handleSignUp)}
            returnKeyType='send'
            />
            )}
          />
          
          <SubmitButton name='Register and Enter' mt={4} mb="78" onPress={handleSubmit(handleSignUp)}/>

          <SubmitButton variant="outline" name='Go back to login' onPress={handleGoBack}/>
        </Center>

      </VStack>
    </ScrollView>
  )
}