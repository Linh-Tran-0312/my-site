import { useState } from 'react';
type Props = {
  src: {
    static: string;
    active: string;
  };
  width: number;
};
function Cat({ src, width }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <img
      src={isHovered ? src.active : src.static}
      width={width}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default Cat;
