import { createContext, useState } from 'react';

export const MouseContext = createContext<{
  cursorType: string;
  cursorChangeHandler: (arg: any) => void;
}>({
  cursorType: '',
  cursorChangeHandler: () => {},
});

const MouseContextProvider = (props: any) => {
  const [cursorType, setCursorType] = useState('');

  const cursorChangeHandler = (cursorType: string) => {
    setCursorType(cursorType);
  };

  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: cursorChangeHandler,
      }}
    >
      {props.children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;
