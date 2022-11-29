import { HStack, Icon, IconButton, Image, Text, VStack } from 'native-base'
import {MaterialIcons} from '@expo/vector-icons'
import { UserPhoto } from './UserPhoto'


export function HomeHeader() {
  return(
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems='center' justifyContent='space-between'>

      <HStack alignItems='center'>
        <UserPhoto
        image='https://avatars.githubusercontent.com/u/79289930?v=4'
        size={16}
        alt='Dashboard User Photo'
        />

        <VStack ml={4}>
          <Text fontFamily='body' fontSize='md' color='gray.100'>
            Hello,
          </Text>
          <Text fontFamily='heading' fontSize='md' color='gray.100'>
            pedroPokas
          </Text>
        </VStack>
      
      </HStack>

      <IconButton
      //importar o icone dentro de um componente icon do NB permite usar o tema
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