"use client";

import { Fragment, useEffect, useRef, useState, PointerEvent, FC, useMemo } from "react";
import { nodes } from "@/app/contants";
import { NodeComponent } from "@/app/components/Node";
import {
  ToolbarWithCss,
  ToolbarWithMotion,
  ToolbarWithLazyLoad,
  ToolbarWithLazyLoadAndVirtual,
  ToolbarProps
} from "@/app/components/Toolbar";

enum ToolbarType {
  Css,
  Motion,
  LazyLoad,
  LazyLoadAndVirtual
}

const ToolbarMap: Record<ToolbarType, FC<ToolbarProps>> = {
  [ToolbarType.Css]: ToolbarWithCss,
  [ToolbarType.Motion]: ToolbarWithMotion,
  [ToolbarType.LazyLoad]: ToolbarWithLazyLoad,
  [ToolbarType.LazyLoadAndVirtual]: ToolbarWithLazyLoadAndVirtual,
};

const AREA_W = 5000;
const AREA_H = 5000;

interface Tab {
  type: ToolbarType;
  text: string;
}

const Tabs: Tab[] = [
  { type: ToolbarType.Css, text: "Pure CSS" },
  { type: ToolbarType.Motion, text: "Framer Motion" },
  { type: ToolbarType.LazyLoad, text: "Lazy Mount" },
  { type: ToolbarType.LazyLoadAndVirtual, text: "Lazy + Virtualized" },
]

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [toolbarType, setToolbarType] = useState<ToolbarType>(ToolbarType.Css);

  const Toolbar = useMemo(() => ToolbarMap[toolbarType], [toolbarType]);

  useEffect(() => {
    const setSize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, []);

  useEffect(() => {
    if (vw && vh) {
      setIsLoading(true);
      setOffset({ x: vw / 2 - AREA_W / 2, y: vh / 2 - AREA_H / 2 });
      setIsLoading(false);
    }
  }, [vw, vh]);

  // Panning
  const onPointerDown = (e: PointerEvent) => {
    setDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setOffset((p) => ({ x: p.x + dx, y: p.y + dy }));
  };
  const onPointerUp = (e: PointerEvent) => {
    setDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  if (isLoading) return (
    <div className={'h-screen w-screen flex items-center justify-center bg-white'}>
      <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
           width="48" height="48">
        <path
          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          className="text-gray-900">
        </path>
      </svg>
    </div>
  )

  return (
    <Fragment>
      {/* Toolbar panel */}
      <div className="absolute left-0 top-0 h-full p-4 z-10">
        <Toolbar expanded={expanded} onToggle={() => setExpanded((prev) => !prev)}/>
      </div>

      <div className={'absolute bottom-3 left-1/2 -translate-x-1/2 z-20'}>
        <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 flex gap-2">
          {Tabs.map((tab) => {
            const isActive = toolbarType === tab.type;

            return (
              <button
                key={tab.type}
                onClick={() => {
                  setExpanded(false);
                  setToolbarType(tab.type);
                }}
                className={`
          relative px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer
          ${isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"}
        `}
              >
                {tab.text}

                {/* optional subtle indicator */}
                {isActive && (
                  <span className="absolute inset-x-2 bottom-1 h-0.5 rounded bg-white/80"/>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite canvas */}
      <div
        key={expanded ? 'key-1' : 'key-2'}
        className={`fixed inset-0 select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="absolute z-10 left-0 top-0 will-change-transform"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          {nodes.map((n) => (
            <NodeComponent node={n} key={n.id}/>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
