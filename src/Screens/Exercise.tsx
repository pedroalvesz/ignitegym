import { ExerciseHeader } from '@components/ExerciseHeader'
import {Center, Text, VStack} from 'native-base'

export function Exercise() {
  return(
    <VStack flex={1}>
      <ExerciseHeader/>
    </VStack>
  )
}