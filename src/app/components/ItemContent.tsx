import { FC } from "react";

interface Props {
  index: number;
}

export const ItemContent: FC<Props> = ({index}) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <span>Item {index + 1}</span>
      <span>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</span>
    </div>
  )
}
