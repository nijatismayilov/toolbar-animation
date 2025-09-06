import { FC } from "react";
import { ItemContent } from "@/app/components/ItemContent";
import { ItemImage } from "@/app/components/ItemImage";
import { ItemActions } from "@/app/components/ItemActions";

interface Props {
  index: number;
}

export const Item: FC<Props> = ({index}) => {
  return (
    <div
      className="p-4 flex items-center justify-start gap-4 border border-gray-200 rounded-xl min-w-fit min-h-fit"
    >
      <ItemImage index={index} />
      <ItemContent index={index} />
      <ItemActions />
    </div>
  )
}
