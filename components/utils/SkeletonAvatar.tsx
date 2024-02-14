import {
  Skeleton,
  Image,
  Avatar,
  ImageProps,
  AvatarProps,
} from "@chakra-ui/react";
import { useState } from "react";

interface SkeletonImageProps extends ImageProps {
  alt: string;
  isLoaded?: boolean;
}

export default function SkeletonAvatar({
  w,
  h,
  isLoaded,
  alt,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(!props.src);
  const sharedProps = { w, h };

  return (
    <Skeleton
      isLoaded={(isLoaded === undefined || isLoaded) && loaded}
      borderRadius="full"
      {...sharedProps}
    >
      {props.src ? (
        <Image
          {...props}
          {...sharedProps}
          alt={alt}
          borderRadius="full"
          onLoad={() => setLoaded(true)}
          objectFit="cover"
        />
      ) : (
        <Avatar
          {...(props.src && { bg: "white" })}
          {...(props as AvatarProps)}
          {...sharedProps}
        />
      )}
    </Skeleton>
  );
}
