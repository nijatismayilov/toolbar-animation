import { FC, useEffect, useState, useRef } from "react";
import { ToolbarTop } from "@/app/components/ToolbarTop";
import { ToolbarContent, ToolbarContentVirtual } from "@/app/components/ToolbarContent";
import { useWindowSize } from "@uidotdev/usehooks";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";

export interface ToolbarProps {
  expanded: boolean;
  onToggle: () => void;
}

export const ToolbarWithCss: FC<ToolbarProps> = ({ expanded, onToggle }) => {
  return (
    <div
      style={{
        transitionDuration: "300ms",
      }}
      className={`${expanded ? 'toolbar-expanded' : 'toolbar-base'} shadow-xl rounded-xl transition-all border border-gray-200 bg-white flex flex-col overflow-hidden`}
    >
      <ToolbarTop onToggle={onToggle} expanded={expanded}/>
      <ToolbarContent key={expanded ? 'key-1' : 'key-2'}/>
    </div>
  )
}

export const ToolbarWithMotion: FC<ToolbarProps> = ({ expanded, onToggle }) => {
  const windowSize = useWindowSize();
  const windowHeight = windowSize.height || 0;
  const animationControl = useAnimationControls();
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      if (expanded) {
        animationControl.start({ width: 650, height: windowHeight - 32 })
      } else {
        animationControl.start({ width: 350, height: 55 })
      }
    } else {
      didMount.current = true;
    }
  }, [expanded, windowHeight])

  return (
    <motion.div
      initial={false}
      animate={animationControl}
      className={`shadow-xl rounded-xl border border-gray-200 bg-white flex flex-col overflow-hidden`}
    >
      <ToolbarTop onToggle={onToggle} expanded={expanded}/>
      <ToolbarContent key={expanded ? 'key-1' : 'key-2'}/>
    </motion.div>
  )
}

export const ToolbarWithLazyLoad: FC<ToolbarProps> = ({ expanded, onToggle }) => {
  const windowSize = useWindowSize();
  const windowHeight = windowSize.height || 0;
  const toolbarAnimationControl = useAnimationControls();
  const [showContent, setShowContent] = useState(expanded);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      (async () => {
        if (expanded) {
          await toolbarAnimationControl.start({ width: 650, height: windowHeight - 32 });

          setShowContent(true);
        } else {
          setShowContent(false);
        }
      })()
    } else {
      didMount.current = true;
    }
  }, [expanded, windowHeight, toolbarAnimationControl])

  return (
    <motion.div
      initial={false}
      animate={toolbarAnimationControl}
      className={`shadow-xl rounded-xl border border-gray-200 bg-white flex flex-col overflow-hidden`}
    >
      <ToolbarTop onToggle={onToggle} expanded={expanded}/>

      <AnimatePresence mode={'sync'} onExitComplete={async () => {
        await toolbarAnimationControl.start({ width: 350, height: 55 });
      }}>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="h-full overflow-hidden"
          >
            <ToolbarContent/>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const ToolbarWithLazyLoadAndVirtual: FC<ToolbarProps> = ({ expanded, onToggle }) => {
  const windowSize = useWindowSize();
  const windowHeight = windowSize.height || 0;
  const toolbarAnimationControl = useAnimationControls();
  const [showContent, setShowContent] = useState(expanded);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      (async () => {
        if (expanded) {
          await toolbarAnimationControl.start({ width: 650, height: windowHeight - 32 });

          setShowContent(true);
        } else {
          setShowContent(false);
        }
      })()
    } else {
      didMount.current = true;
    }
  }, [expanded, windowHeight, toolbarAnimationControl])

  return (
    <motion.div
      initial={false}
      animate={toolbarAnimationControl}
      className={`shadow-xl rounded-xl border border-gray-200 bg-white flex flex-col overflow-hidden`}
    >
      <ToolbarTop onToggle={onToggle} expanded={expanded}/>

      <AnimatePresence mode={'sync'} onExitComplete={async () => {
        await toolbarAnimationControl.start({ width: 350, height: 55 });
      }}>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="h-full overflow-hidden"
          >
            <ToolbarContentVirtual/>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
