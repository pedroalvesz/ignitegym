import {Center, Spinner} from 'native-base'

export function Loading(){
  return(
    <Center flex={1} background="gray.700">
      <Spinner size="lg" color="white"/>
    </Center>
  )
}