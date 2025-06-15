'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, memo } from 'react';
import './App.css';
import Code from './components/code/Code';
import LoadingScreen from './components/loading/Loading';
import Welcome from './components/loading/Welcome';
import Me, { About } from './components/me/Me';
import { Nav, NavItemType } from './components/nav/Nav';
import Read, { Book } from './components/read/Read';
import { CardProps } from './components/share/custom-card/CustomCard';
import Study, { StudyProps } from './components/study/Study';
import Work, { Experience } from './components/work/Work';
import Write from './components/write/Write';
import Layout from './Layout';

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
const Content = ({
  combinedRef,
  data,
}: {
  combinedRef: (navItem: NavItemType) => (node: HTMLDivElement) => void;
  data: Data;
}) => {
  return (
    <>
      <Me ref={combinedRef('me')} me={data.about} />
      <Work ref={combinedRef('work')} experience={data.experience} />
      <Code ref={combinedRef('code')} projects={data.projects} />
      <Write ref={combinedRef('write')} blogs={data.blogs} />
      <Read ref={combinedRef('read')} books={data.books} />
      <Study ref={combinedRef('study')} study={data.study} />
    </>
  );
};
const MemoContent = memo(Content, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
const App = () => {
  const [data, setData] = useState<Data>();

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
      <Layout
        data={data}
        renderContent={({ combinedRef }) => (
          <MemoContent combinedRef={combinedRef} data={data} />
        )}
      />
    </>
  );
};
export default App;
