import { useState } from 'react'
import { Heading, VStack, SectionList, Text} from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function History() {

  const [exercisesDone, setExercisesDone] = useState([
    {
      title: '30.11.2022',
      data: ['Pull Down', 'Pull Up']
    },
    {
      title: '29.11.2022',
      data: ['Bench Press',]
    }
  ])

  return(
    <VStack flex={1}>
      <ScreenHeader name="Exercises History"/>

      <VStack flex={1} px={8}>
        <SectionList
        sections={exercisesDone}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard/>
        )}

        renderSectionHeader={({ section }) => (
          <Heading fontFamily='heading' fontSize='md' color='gray.200' mt={10} mb={3} >
            {section.title}
          </Heading>
        )}
        
        // Operador que sempre que a primeira expressão for convertida em true, ele retorna a segunda expressão
        contentContainerStyle={exercisesDone.length === 0 && { flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <Text color='gray.200' textAlign='center'>
            No registered exercises. {'\n'}
            Let's get our body and mind in shape?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  )
}