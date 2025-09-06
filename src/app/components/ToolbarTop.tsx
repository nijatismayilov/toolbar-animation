import { FC } from "react";

interface Props {
  expanded: boolean;
  onToggle: () => void;
}

export const ToolbarTop: FC<Props> = ({ expanded, onToggle }) => {
  return (
    <div className="h-[55px] w-full p-2 flex shrink-0">
      <button
        className="rounded-lg hover:bg-gray-200 cursor-pointer px-4 border border-gray-200"
        onClick={onToggle}
      >
        {expanded ? "Close" : "Open"}
      </button>
    </div>
  )
}
