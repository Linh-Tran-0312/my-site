import { useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Welcome from './components/loading/Welcome';
import NavBar, { NavItemType } from './components/nav/Nav';

type Props = {
  renderContent: (props: {
    combinedRef: (navItem: NavItemType) => (node: HTMLDivElement) => void;
  }) => JSX.Element;
  data: {
    nav: {
      me: string;
      work: string;
      code: string;
      write: string;
      study: string;
      read: string;
    };
  };
};
type DivRef = React.RefObject<HTMLDivElement>;
const Layout = ({ renderContent, data }: Props) => {
  const meRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const writeRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLDivElement>(null);

  const navItemRef: Record<NavItemType, DivRef> = {
    me: meRef,
    work: workRef,
    code: codeRef,
    write: writeRef,
    study: studyRef,
    read: readRef,
  };

  const [meRefFn, meInView] = useInView({ threshold: 0.8 });
  const [writeRefFn, writeInView] = useInView({ threshold: 0.5 });
  const [codeRefFn, codeInView] = useInView({ threshold: 0.5 });
  const [workRefFn, workInView] = useInView({ threshold: 0.5 });
  const [studyRefFn, studyInView] = useInView({ threshold: 0.9 });
  const [readRefFn, readInView] = useInView({ threshold: 0.8 });

  const navItemRefFn = {
    me: meRefFn,
    work: workRefFn,
    code: codeRefFn,
    write: writeRefFn,
    study: studyRefFn,
    read: readRefFn,
  };
  const combinedRef = useCallback(
    (navItem: NavItemType) => (node: HTMLDivElement) => {
      navItemRefFn[navItem](node);
      (navItemRef[navItem] as React.MutableRefObject<HTMLDivElement>).current =
        node;
    },
    []
  );

  const scrollIntoView = useCallback((navItem: NavItemType) => {
    if (navItemRef[navItem].current) {
      navItemRef[navItem].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Welcome />
      <div className='position-relative'>
        <NavBar
          nav={data.nav}
          inView={{
            code: codeInView,
            work: workInView,
            me: meInView,
            write: writeInView,
            study: studyInView,
            read: readInView,
          }}
          scrollIntoView={scrollIntoView}
        />
        {renderContent({ combinedRef })}
        <div
          style={{ height: 100 }}
          className='d-flex justify-content-center flex-column align-items-center border'
        >
          <span className='text-secondary'>Thanks for visiting my site!</span>
          <span className='text-secondary'>
            <small> Created by 💚 Linh Tran</small>
          </span>
        </div>
      </div>
    </>
  );
};
export default Layout;
