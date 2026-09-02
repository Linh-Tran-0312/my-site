import { useState } from 'react';
type Props = {
  src: {
    static: string;
    active: string;
  };
  width: number;
  forceActive?: boolean;
};
function Cat({ src, width, forceActive = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <img
      src={isHovered || forceActive ? src.active : src.static}
      width={width}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default Cat;
