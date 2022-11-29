import { VStack } from 'native-base'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function History() {
  return(
    <VStack flex={1}>
      <ScreenHeader name="Exercises History"/>

      <VStack flex={1} px={8}>
        <HistoryCard/>
      </VStack>
    </VStack>
  )
}