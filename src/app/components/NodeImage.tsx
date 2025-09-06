import { Node } from "@/app/models";
import { FC } from "react";
import Image from "next/image";

interface Props {
  node: Node;
}

export const NodeImage: FC<Props> = ({node}) => {
  return (
    <Image
      src={`https://picsum.photos/seed/picsum/200`}
      alt={`Image of ${node.id + 1}.`}
      height={75}
      width={75}
      className="rounded-lg"
    />
  )
}
