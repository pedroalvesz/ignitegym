import {Button, Text, IButtonProps} from 'native-base'

type Props = IButtonProps & {
  name: string;
  variant?: 'outline' | 'solid'
}


//tipando quais variantes eu estou usando, dizendo que não é obrigatório passar variante, quando não passar vai ser a solid
export function SubmitButton({name, variant = 'solid', ...rest} : Props) {
  return(
    <Button
    bg={variant === 'outline' ? 'transparent' : 'green.700'}
    borderWidth={variant === 'outline' ? 1 : 0}
    borderColor='green.700'
    width='100%'
    height={14}
    _pressed={{
      bg: variant === 'outline' ? 'gray.500' : 'green.500'
    }}
    {...rest}
    >
      <Text fontFamily='heading' fontSize='md' color={variant === 'outline' ? 'green.700' : 'white'}>
        {name}
      </Text>
    </Button>
  )
}