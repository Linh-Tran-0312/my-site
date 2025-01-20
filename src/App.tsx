import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Code from './components/code/Code';
import LoadingScreen from './components/loading/Loading';
import Welcome from './components/loading/Welcome';
import Me from './components/me/Me';
import NavBar, { NavItemType } from './components/nav/Nav';
import Study from './components/study/Study';
import Work from './components/Work';
import Write from './components/write/Write';
import './App.css';
import Read from './components/read/Read';
import { About } from './components/me/Me';
import { Experience } from './components/Work';
import { Project } from './components/code/Code';
import { Blog } from './components/write/Write';
import { StudyProps } from './components/study/Study';
import { Nav } from './components/nav/Nav';

type Data = {
  about: About;
  nav: Nav;
  projects: Project[];
  blogs: Blog[];
  experience: Experience[];
  study: StudyProps;
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
  const studyRef = useRef<HTMLDivElement>();

  const navItemRef = {
    me: meRef,
    work: workRef,
    code: codeRef,
    write: writeRef,
    study: studyRef,
  };

  const [meRefFn, meInView] = useInView({ threshold: 0.5 });
  const [writeRefFn, writeInView] = useInView({ threshold: 0.2 });
  const [codeRefFn, codeInView] = useInView({ threshold: 0.6 });
  const [workRefFn, workInView] = useInView({ threshold: 0.5 });
  const [studyRefFn, studyInView] = useInView({ threshold: 0.8 });

  const navItemRefFn = {
    me: meRefFn,
    work: workRefFn,
    code: codeRefFn,
    write: writeRefFn,
    study: studyRefFn,
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
    }, 2000);
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
          }}
          scrollIntoView={scrollIntoView}
        />
        <Me ref={combinedRef('me')} me={data.about} />
        <Work ref={combinedRef('work')} experience={data.experience} />

        <Code ref={combinedRef('code')} projects={data.projects} />
        <Write ref={combinedRef('write')} blogs={data.blogs} />
        <Read />
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
