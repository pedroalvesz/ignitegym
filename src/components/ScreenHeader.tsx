import { Center, Heading } from 'native-base'

type ScreenHeaderProps = {
  name: string
}


export function ScreenHeader({ name } : ScreenHeaderProps) {
  return(
    <Center pt={16} pb={6} bg='gray.600'>
      <Heading fontFamily='heading' fontSize='xl' color='gray.100' >
        {name}
      </Heading>
    </Center>
  )
}