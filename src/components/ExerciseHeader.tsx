import { Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps} from 'react-native'
import { Feather } from '@expo/vector-icons'

import BodySvg from '@assets/body.svg'

type ExerciseHeaderProps = TouchableOpacityProps & {
  name: string;
  group: string;
}


export function ExerciseHeader({name, group, ...rest} : ExerciseHeaderProps) {
  return(
    <VStack bg='gray.600' h='148px' px={8} pt={50}>
        <TouchableOpacity {...rest}>
          <Icon
          as={Feather}
          name='arrow-left'
          color='green.500'
          size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent='space-between' pt={4} pb={8}>
          <Heading fontFamily='heading' textTransform='capitalize' fontSize='xl' color='gray.100' flexShrink={1} pr={3}>
            {name}
          </Heading>
          <HStack alignItems='center'>
            <BodySvg/>

            <Text fontFamily='body' textTransform='capitalize' fontSize='md' color='gray.200'
            ml={1} >
              {group}
            </Text>
          </HStack>
        </HStack>
    </VStack>
  )
}