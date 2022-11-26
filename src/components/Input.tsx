import {Input as NativeBaseInput, IInputProps} from 'native-base'


//quando for uma propriedade inerente do componente, não é necessário criar aquela interface tipando os dados que então vindo, somente anexar com o IProps do componente
export function Input({...rest} : IInputProps) {
return(
  <NativeBaseInput
  backgroundColor="gray.900"
  color="white"
  width="100%"
  height="14"
  px={4}
  mb={4}
  borderWidth={0}

  fontFamily="body"
  fontSize="sm"
  placeholderTextColor='gray.300'
  _focus={{
    borderWidth: 1,
    borderColor: 'green.500'
  }}
  {...rest}
  />
)  
}