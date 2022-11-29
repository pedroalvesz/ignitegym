import { Image, VStack, IImageProps } from 'native-base'



type userPhotoProps = IImageProps & {
  image: string;
  size: number;
}


export function UserPhoto({image, size, ...rest} : userPhotoProps) {
  return(
    <VStack>
      <Image
      source={{ uri: image}}
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