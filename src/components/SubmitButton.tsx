import {Button, Text} from 'native-base'

interface Props {
  name: string;
}

export function SubmitButton({name} : Props) {
  return(
    <Button
    bg='green.700' 
    width='100%'
    height={14}
    _pressed={{
      bg: 'green.500'
    }}
    >
      <Text fontFamily='heading' fontSize='md' color='white'>{name}</Text>
    </Button>
  )
}