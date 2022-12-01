import { Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'

import BodySvg from '@assets/body.svg'

export function ExerciseHeader() {
  return(
    <VStack bg='gray.600' h='148px' px={8} pt={12}>
        <TouchableOpacity>
          <Icon
          as={Feather}
          name='arrow-left'
          color='green.500'
          size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent='space-between' pt={4} pb={8}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.100' flexShrink={1}>
            Pull Down
          </Heading>
          <HStack alignItems='center'>
            <BodySvg/>

            <Text fontFamily='body' fontSize='md' color='gray.200'
            ml={1} >
              Back
            </Text>
          </HStack>
          
        </HStack>
    </VStack>
  )
}