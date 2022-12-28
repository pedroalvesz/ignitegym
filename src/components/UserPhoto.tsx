import { Image, VStack, IImageProps } from 'native-base'

type userPhotoProps = IImageProps & {
  size: number;
}


export function UserPhoto({size, ...rest} : userPhotoProps) {
  return(
    <VStack>
      <Image
      width={size}
      height={size}
      rounded='full'
      borderWidth={2}
      borderColor='gray.500'

      {...rest}
      />
    </VStack>
  )
}