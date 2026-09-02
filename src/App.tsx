'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, memo } from 'react';
import './App.css';
import AiAssistant from './components/ai-assistant/AiAssistant';
import { DATA_API_URL } from './config/api';
import Code from './components/code/Code';
import LoadingScreen from './components/loading/Loading';
import Welcome from './components/loading/Welcome';
import Me from './components/me/Me';
import { NavItemType } from './components/nav/Nav';
import Read from './components/read/Read';
import Study from './components/study/Study';
import Work from './components/work/Work';
import Write from './components/write/Write';
import Layout from './Layout';
import { SiteData } from './types/siteData';

const getData = async (path: string) => {
  const data = await fetch(path);
  return data.json();
};
const Content = ({
  combinedRef,
  data,
}: {
  combinedRef: (navItem: NavItemType) => (node: HTMLDivElement) => void;
  data: SiteData;
}) => {
  return (
    <>
      <Me ref={combinedRef('me')} me={data.about} />
      <Work ref={combinedRef('work')} experience={data.experience} />
      <Code
        ref={combinedRef('code')}
        projects={data.projects}
        skills={data.skills}
      />
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
  const [data, setData] = useState<SiteData>();

  useEffect(() => {
    setTimeout(() => {
      getData(DATA_API_URL).then((data) => setData(data));
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
      <AiAssistant />
    </>
  );
};
export default App;
