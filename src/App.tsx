import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './App.css';
import Code from './components/code/Code';
import LoadingScreen from './components/loading/Loading';
import Welcome from './components/loading/Welcome';
import Me, { About } from './components/me/Me';
import NavBar, { Nav, NavItemType } from './components/nav/Nav';
import Read, { Book } from './components/read/Read';
import { CardProps } from './components/share/custom-card/CustomCard';
import Study, { StudyProps } from './components/study/Study';
import Work, { Experience } from './components/work/Work';
import Write from './components/write/Write';

type Data = {
  about: About;
  nav: Nav;
  projects: CardProps[];
  blogs: CardProps[];
  experience: Experience[];
  study: StudyProps;
  books: Book[];
};
const getData = async (path: string) => {
  const data = await fetch(path);
  return data.json();
};

const App = () => {
  const [data, setData] = useState<Data>();
  const meRef = useRef<HTMLDivElement>();
  const workRef = useRef<HTMLDivElement>();
  const codeRef = useRef<HTMLDivElement>();
  const writeRef = useRef<HTMLDivElement>();
  const readRef = useRef<HTMLDivElement>();
  const studyRef = useRef<HTMLDivElement>();

  const navItemRef = {
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
      navItemRef[navItem].current = node;
    },
    []
  );

  const scrollIntoView = useCallback((navItem: NavItemType) => {
    if (navItemRef[navItem].current) {
      navItemRef[navItem].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData('data.json').then((data) => setData(data));
    }, 100);
  }, []);

  if (!data) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Welcome />
      <div>
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
        <Me ref={combinedRef('me')} me={data.about} />
        <Work ref={combinedRef('work')} experience={data.experience} />
        <Code ref={combinedRef('code')} projects={data.projects} />
        <Write ref={combinedRef('write')} blogs={data.blogs} />
        <Read ref={combinedRef('read')} books={data.books} />
        <Study ref={combinedRef('study')} study={data.study} />
        <div
          style={{ height: 100 }}
          className='d-flex justify-content-center flex-column align-items-center border'
        >
          <span>Thanks for visiting my site</span>
          <span className='text-secondary'>
            <small> Created by 💚 Linh Tran</small>
          </span>
        </div>
      </div>
    </>
  );
};
export default App;
