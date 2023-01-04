import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'

import { AntDesign } from '@expo/vector-icons'

import { exerciseDTO } from '@dtos/exerciseDTO'
import { api } from '@services/api'


type CardProps = TouchableOpacityProps & {
  data: exerciseDTO;
}


export function ExerciseCard({data, ...rest} : CardProps) {
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
        source={{uri : `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
        w={16}
        h={16}
        rounded='md'
        alt={data.name}
        />

        <VStack ml={4} flex={1}>
          <Heading textTransform='capitalize' fontFamily='heading' fontSize='lg' color='white'>
            {data.name}
          </Heading>
          <Text fontFamily='body' fontSize='sm' color='gray.200' numberOfLines={1}>
            {data.series} series x {data.repetitions} repetitions
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