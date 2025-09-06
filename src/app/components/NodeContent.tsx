import { FC } from "react";
import { Node } from "@/app/models";

interface Props {
  node: Node;
}

export const NodeContent: FC<Props> = ({node}) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <span className="text-sm text-gray-700">Node {node.id}</span>
      <span>Lorem ipsum dolor sit amet</span>
    </div>
  )
}
