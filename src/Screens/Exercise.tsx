import { useEffect, useState } from 'react'
import { HStack, Image, ScrollView, Text, useToast, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ExerciseHeader } from '@components/ExerciseHeader'
import { SubmitButton } from '@components/SubmitButton'

import SetsSvg from '@assets/series.svg'
import RepsSvg from '@assets/repetitions.svg'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { exerciseDTO } from '@dtos/exerciseDTO'

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {

  const [exercise, setExercise] = useState<exerciseDTO>({} as exerciseDTO)

  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps;
  const { goBack } = useNavigation()

  const toast = useToast()

  function handleGoBack() {
    goBack()
  }

  async function getExerciseDetails() {
    try {
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to load exercise details.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        mx: 4,
      })
    }
  }

  useEffect(() => {
    getExerciseDetails()
  }, [exerciseId])

  return(
    <VStack flex={1}>
      <ExerciseHeader
      name={exercise.name}
      group={exercise.group}
      onPress={handleGoBack}
      />

      <ScrollView>
      <VStack flex={1} p={8}>
        <Image
        source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
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
              {exercise.series} Sets
            </Text>
    
          </HStack>

          <HStack>
            <RepsSvg/>
            <Text fontFamily='body' fontSize='md' color='gray.100' ml={2}>
              {exercise.repetitions} Repetitions
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