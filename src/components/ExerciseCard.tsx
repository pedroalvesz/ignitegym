import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'

import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'


type CardProps = TouchableOpacityProps & {
  name: string;
}

export function ExerciseCard({name, ...rest} : CardProps) {
  return(
    <TouchableOpacity {...rest}>
      <HStack
      bg='gray.600'
      p={2}
      pr={4}
      mb={3}
      width='100%'
      height='83px'
      alignItems='center'
      rounded='lg'
      >
        <Image
        source={{uri : 'https://fortissima.com.br/wp-content/uploads/2016/04/remada-curvada-doutissima-istock.jpg'}}
        w={16}
        h={16}
        rounded='md'
        alt='exercise photo'
        />

        <VStack ml={4} flex={1}>
          <Heading fontFamily='heading' fontSize='lg' color='white'>
            {name}
          </Heading>
          <Text fontFamily='body' fontSize='sm' color='gray.200' numberOfLines={1}>
            3x12
          </Text>
        </VStack>

        <Icon
        as={AntDesign}
        name='right'
        size={6}
        color='gray.400'
        />

      </HStack>
    </TouchableOpacity>
  )
}