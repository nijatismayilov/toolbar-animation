import { FC } from "react";

export const ItemActions: FC = () => {
  return (
    <div className={'flex flex-col shrink-0 gap-1'}>
      <button
        className="rounded-lg hover:bg-gray-200 cursor-pointer px-4 py-2 border border-gray-200 min-w-fit w-fit"
      >
        Action 1
      </button>

      <button
        className="rounded-lg hover:bg-gray-200 cursor-pointer px-4 py-2 border border-gray-200 min-w-fit w-fit"
      >
        Action 2
      </button>
    </div>
  )
}
