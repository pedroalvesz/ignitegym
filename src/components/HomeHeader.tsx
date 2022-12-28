import { Heading, HStack, Icon, IconButton, Text, VStack } from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'
import { useAuth } from '@hooks/useAuth'

import DefaultUserPhoto from '@assets/userPhotoDefault.png'

export function HomeHeader() {

  const { user, signOut } = useAuth()

  return(
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems='center' justifyContent='space-between'>

      <HStack alignItems='center'>
        <UserPhoto
        source={user.avatar ? {uri: user.avatar} : DefaultUserPhoto}
        size={16}
        alt='Dashboard User Photo'
        />

        <VStack ml={4}>
          <Heading fontFamily='body' fontSize='md' color='gray.100'>
            Hello,
          </Heading>
          <Text fontFamily='heading' fontSize='md' color='gray.100'>
            {user.name}
          </Text>
        </VStack>
      
      </HStack>

      <IconButton
      //importar o icone dentro de um componente icon do NB permite usar o tema
      onPress={signOut}
      icon={<Icon
        as={MaterialIcons}
        name='logout'
        size={7}
        color='gray.200'
      />}
      />

    </HStack>
  )
}