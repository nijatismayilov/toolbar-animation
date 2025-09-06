import { FC, useRef } from "react";
import { Item } from "@/app/components/Item";
import { useVirtualizer } from "@tanstack/react-virtual";

export const ToolbarContent: FC = () => {
  return (
    <div className="flex-1 flex max-h-full border-t border-gray-200">
      <div className="px-4 py-4 bg-gray-50 border-r border-gray-200 w-[200px]"></div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto p-3">
        {Array.from({ length: 750 }).map((_, index) => (
          <Item index={index} key={index} />
        ))}
      </div>
    </div>
  )
}

export const ToolbarContentVirtual: FC = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 750,
    getScrollElement: () => scrollbarRef.current ?? null,
    estimateSize: () => 138,
    overscan: 3,
    gap: 12,
  })
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex-1 flex max-h-full border-t border-gray-200">
      <div className="px-4 py-4 bg-gray-50 border-r border-gray-200 w-[200px]"></div>

      <div ref={scrollbarRef} className="flex-1 flex flex-col overflow-y-auto p-3">
        <div style={{ height: virtualizer.getTotalSize() }} className={'relative'}>
          {virtualItems.map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
                height: `${virtualItem.size}px`
              }}
            >
              <Item index={virtualItem.index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
