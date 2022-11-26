import {Button, Text, IButtonProps} from 'native-base'

type Props = IButtonProps & {
  name: string;
}

export function SubmitButton({name, variant, ...rest} : Props) {
  return(
    <Button
    bg={variant === 'outline' ? 'transparent' : 'green.700'}
    borderWidth={variant === 'outline' ? 1 : 0}
    borderColor='green.700'
    width='100%'
    height={14}
    _pressed={{
      bg: 'green.500'
    }}
    {...rest}
    >
      <Text fontFamily='heading' fontSize='md' color={variant === 'outline' ? 'green.700' : 'white'}>
        {name}
      </Text>
    </Button>
  )
}