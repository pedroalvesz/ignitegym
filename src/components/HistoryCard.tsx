import { Heading, HStack, Text, VStack } from 'native-base'


type HistoryCardProps = {
  name: string;
  group: string;
  hour: string;
}

export function HistoryCard({name, group, hour} : HistoryCardProps) {
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
        <Heading fontFamily='heading' textTransform='capitalize' fontSize='md'
        color='white' numberOfLines={1}>
          {group}        
        </Heading>
        <Text fontFamily='body' textTransform='capitalize' fontSize='lg' color='gray.100' pt={1} numberOfLines={1}>
          {name}
        </Text>
      </VStack>
      
      <Text fontFamily='body' fontSize='md' color='gray.300'>
        {hour}
      </Text>
    </HStack>
  )
}