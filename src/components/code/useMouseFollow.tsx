import { useState, useEffect } from "react";

const isMouseInsideDiv = (event: React.MouseEvent<HTMLElement>, divRef: React.RefObject<any>) => {
  if(!divRef.current) return false;
  const rect = divRef.current?.getBoundingClientRect();
  if (rect) {
    const { clientX, clientY } = event;
    const isInside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;
      return isInside
  }
  return false;
}
// const CustomCursor = ({ top, left, area, clickHanlder }: any) => {
//     // if(!area) return null;
//     return (
//       <div
//         className="custom-cursor"
//         style={{
//           left: `${left}px`,
//           top: `${top}px`,
//           visibility: area ? "visible" : "hidden",
//         }}
//         onClick={clickHanlder[area]}
//       >
//         <Icon
//           icon={area === "left" ? faCircleArrowLeft : faCircleArrowRight}
//           fontSize={30}
//           color={area === "left" ? "black" : "white"}
//         />
//       </div>
//     );
//   };
type CursorArea = 'left' | 'right' | null;
const EXCLUSIVE_TAGNAMES = ['BUTTON', 'svg', 'path'];
const useMouseFollow = (ref: React.RefObject<HTMLElement>, exclusiveRefs: string[]) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorArea, setCursorArea] = useState<CursorArea>(null);

  useEffect(() => {
    const area = ref.current;
    console.log(area)
    if (!area) return;

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const rect = area.getBoundingClientRect();
        const middle = rect.width/2;
        if(
            // EXCLUSIVE_TAGNAMES.includes(target.tagName) ||
            exclusiveRefs.includes(target.id) ||
             !area.contains(target) || 
             !isMouseInsideDiv(e, ref)
            ) {
            setCursorArea(null);
           
        } else {
            const { left, top } = rect;
            const isOnLeftArea = e.clientX < left + middle;
            setCursorArea(isOnLeftArea ? 'left' : 'right');
      
            console.log(e.clientX, e.clientY)
            const x = e.clientX - left;
            const y = e.clientY - top;
            setCursorPosition({ x, y });
        }
         
      };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const rect = area.getBoundingClientRect();
        const middle = rect.width/2;
    if (target.tagName !== "BUTTON") {
        const { left } = rect;
        const isOnLeftArea = e.clientX < left + middle;
        setCursorArea(isOnLeftArea ? 'left' : 'right')
    }
    };

    const handleMouseLeave = () => {
      setCursorArea(null);
    };

    area.addEventListener("mousemove", handleMouseMove);
    area.addEventListener("mouseenter", handleMouseEnter);
    area.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup on component unmount or ref change
    return () => {
      area.removeEventListener("mousemove", handleMouseMove);
      area.removeEventListener("mouseenter", handleMouseEnter);
      area.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref.current]);
  console.log(cursorPosition)
  return { cursorPosition, cursorArea };
};

export default useMouseFollow;
