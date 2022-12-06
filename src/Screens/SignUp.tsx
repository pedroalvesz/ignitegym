import { useNavigation } from '@react-navigation/native'
import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base'

import { useForm, Controller } from 'react-hook-form'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { SubmitButton } from '@components/SubmitButton'


type SignUpProps = {
  username: string,
  email: string,
  password: string,
  password_confirm: string,
}

export function SignUp() {

  const navigation = useNavigation()
  const { control, handleSubmit} = useForm<SignUpProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp( data : SignUpProps) {
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

        <Center mt={24} mb='90px'>
          <LogoSvg/>
          <Text fontFamily="body" fontSize="sm" color="gray.100">Your mind and body in shape</Text>
        </Center>

        <Center px={7}>

          <Heading fontFamily='heading' color='gray.100' mb={4}>
            Register your account
          </Heading>

          <Controller
          name='username'
          control={control}
          render={({ field : { onChange, value} }) => (
            <Input 
            placeholder='Username'
            autoCapitalize='none'
            onChangeText={onChange}
            value={value}
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