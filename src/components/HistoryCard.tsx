import { Heading, HStack, Text, VStack } from 'native-base'

export function HistoryCard() {
  return(
    <HStack
    bg='gray.600'
    width='100%'
    px={5}
    py={4}
    justifyContent='space-between'
    alignItems='center'
    rounded='lg'
    mb={3}
    >

      <VStack flex={1}>
        <Heading fontFamily='heading' fontSize='md'
        color='white' numberOfLines={1}>
          Back         
        </Heading>
        <Text fontFamily='body' fontSize='lg' color='gray.100' pt={1} numberOfLines={1}>
          Pull Down
        </Text>
      </VStack>
      
      <Text fontFamily='body' fontSize='md' color='gray.300'>
        12:00
      </Text>
    </HStack>
  )
}