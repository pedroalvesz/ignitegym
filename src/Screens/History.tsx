import { useCallback, useState } from 'react'
import { Heading, VStack, SectionList, Text, useToast, Center} from 'native-base'

import { useFocusEffect } from '@react-navigation/native'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'
import { Loading } from '@components/Loading'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { historySectionDTO } from '@dtos/historySectionDTO'

export function History() {

  const [isLoading, setIsLoading] = useState(true)
  const [exercisesDone, setExercisesDone] = useState<historySectionDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      const response = await api.get('/history')

      setExercisesDone(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to load your history.'

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
        mx: 4,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  },[]))

  return(
    <VStack flex={1}>
      <ScreenHeader name="Exercises History"/>
      <VStack flex={1} px={8}>
        {isLoading
        ?
        <Loading/>
        :
        (exercisesDone.length === 0
        ?
        <Center flex={1}>
          <Text color='gray.200' textAlign='center'>
            No registered exercises. {'\n'}
            Let's get your body and mind in shape?
          </Text>
        </Center>
        :
        <SectionList
        sections={exercisesDone}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard name={item.name} group={item.group} hour={item.hour}/>
        )}

        renderSectionHeader={({ section }) => (
          <Heading fontFamily='heading' fontSize='md' color='gray.200' mt={10} mb={3} >
            {section.title}
          </Heading>
        )}
        
        // Operador que sempre que a primeira expressão for convertida em true, ele retorna a segunda expressão
        contentContainerStyle={exercisesDone.length === 0 && { flex: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}
        />
        )
        }
        
      </VStack>
    </VStack>
  )
}