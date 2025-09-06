import { FC } from "react";
import Image from "next/image";

interface Props {
  index: number;
}

export const ItemImage: FC<Props> = ({index}) => {
  return (
    <Image
      src={`https://picsum.photos/seed/picsum/200`}
      alt={`Image of ${index + 1}.`}
      height={100}
      width={100}
      className="rounded-lg"
    />
  )
}
