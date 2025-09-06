import { FC } from "react";
import { Node } from "@/app/models";
import { NodeContent } from "@/app/components/NodeContent";
import { NodeImage } from "@/app/components/NodeImage";

interface NodeProps {
  node: Node;
}

const NODE_W = 300;
const NODE_H = 100;

export const NodeComponent: FC<NodeProps> = ({node}) => {
  return (
    <div
      className="absolute rounded-lg border border-gray-200 bg-white shadow-md flex gap-3 items-center p-4"
      style={{
        left: node.x,
        top: node.y,
        width: NODE_W,
        height: NODE_H,
      }}
    >
      <NodeImage node={node} />
      <NodeContent node={node} />
    </div>
  )
}
