import { IPressableProps, Pressable, Text } from 'native-base'


type GroupProps = IPressableProps & {
  name: string;
  isActive: boolean;
}

export function Group({ name, isActive, ...rest} : GroupProps) {
  return(
    <Pressable
    bg='gray.800'
    height='43px'
    width='96px'
    py={3}
    mr={3}
    borderRadius='md'
    justifyContent='center'
    alignItems='center'
    overflow='hidden'
    // No lugar de criar um ternario em cada propriedade, definimos o lugar do pressed pelo is active
    isPressed={isActive}
    _pressed={{
      borderWidth: 1,
      borderColor: 'green.500',
    }}
    
    {...rest}
    >
      <Text fontFamily='body'
      fontSize='xs'
      color={isActive ? 'green.500' : 'gray.200'}
      textTransform='uppercase'
      >
        {name}
      </Text>
    </Pressable>

  )
}