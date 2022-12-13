import { HStack, Image, ScrollView, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { ExerciseHeader } from '@components/ExerciseHeader'
import { SubmitButton } from '@components/SubmitButton'

import SetsSvg from '@assets/series.svg'
import RepsSvg from '@assets/repetitions.svg'

export function Exercise() {

  const {goBack} = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return(
    <VStack flex={1}>
      <ExerciseHeader
      onPress={handleGoBack}
      />

      <ScrollView>
      <VStack flex={1} p={8}>
        <Image
        source={{uri: 'https://fortissima.com.br/wp-content/uploads/2016/04/remada-curvada-doutissima-istock.jpg'}}
        alt='Exercise Detail Photo'
        rounded='lg'
        resizeMode='cover'
        w='full'
        h={80}
        />

        <VStack bg='gray.600' rounded='lg' mt={3} px={4} pt={5} pb={4}>
          <HStack justifyContent='space-between' px={3} mb={6}>

          <HStack>
            <SetsSvg/>
            <Text fontFamily='body' fontSize='md' color='gray.100' ml={2}>
              3 Sets
            </Text>
    
          </HStack>

          <HStack>
            <RepsSvg/>
            <Text fontFamily='body' fontSize='md' color='gray.100' ml={2}>
              12 Repetitions
            </Text>
    
          </HStack>
          </HStack>

          <SubmitButton
          name='Register as done'
          />
        </VStack>
      </VStack>
      </ScrollView>
    </VStack>
  )
}