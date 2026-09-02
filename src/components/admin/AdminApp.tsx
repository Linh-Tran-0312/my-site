import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Nav, Spinner, Tab } from 'react-bootstrap';
import { ADMIN_DATA_API_URL, DATA_API_URL, WORKER_BASE_URL } from '../../config/api';
import { SiteData } from '../../types/siteData';
import CodeSection from './sections/CodeSection';
import LeadsSection from './sections/LeadsSection';
import MeSection from './sections/MeSection';
import PersonalInfoSection from './sections/PersonalInfoSection';
import ReadSection from './sections/ReadSection';
import StudySection from './sections/StudySection';
import WorkSection from './sections/WorkSection';
import WriteSection from './sections/WriteSection';

const PASSWORD_STORAGE_KEY = 'admin_password';

const SECTIONS = [
  'me',
  'work',
  'code',
  'write',
  'read',
  'study',
  'personalInfo',
  'leads',
] as const;
type SectionKey = (typeof SECTIONS)[number];
const SECTION_LABELS: Record<SectionKey, string> = {
  me: 'Me',
  work: 'Work',
  code: 'Code',
  write: 'Write',
  read: 'Read',
  study: 'Study',
  personalInfo: 'Personal Information',
  leads: 'Leads',
};

function AdminApp() {
  const [password, setPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isCheckingLogin, setIsCheckingLogin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [data, setData] = useState<SiteData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('me');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch(DATA_API_URL);
      if (!res.ok) {
        throw new Error(`Failed to load data (status ${res.status})`);
      }
      const loaded: SiteData = await res.json();
      setData({
        ...loaded,
        personalInfo: loaded.personalInfo ?? [],
        cv: loaded.cv ?? { url: '', fileName: '' },
      });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoadingData(false);
    }
  };

  const verifyPassword = async (candidate: string) => {
    setIsCheckingLogin(true);
    setLoginError(null);
    try {
      const res = await fetch(`${WORKER_BASE_URL}/admin/verify`, {
        headers: { Authorization: `Bearer ${candidate}` },
      });
      if (res.status === 401) {
        setLoginError('Wrong password.');
        sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
        return;
      }
      if (!res.ok) {
        throw new Error(`Login check failed (status ${res.status})`);
      }
      sessionStorage.setItem(PASSWORD_STORAGE_KEY, candidate);
      setPassword(candidate);
      setIsAuthenticated(true);
      loadData();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsCheckingLogin(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSWORD_STORAGE_KEY);
    if (stored) {
      verifyPassword(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim()) {
      verifyPassword(passwordInput.trim());
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(PASSWORD_STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword('');
    setPasswordInput('');
    setData(null);
  };

  const handleSave = async () => {
    if (!data) {
      return;
    }
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);
    try {
      const res = await fetch(ADMIN_DATA_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        setSaveError('Session expired — please log in again.');
        handleLogout();
        return;
      }
      if (!res.ok) {
        throw new Error(`Save failed (status ${res.status})`);
      }
      setSaveSuccess('Saved! Changes are live on the site.');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container style={{ maxWidth: 400 }} className='py-5'>
        <h2 className='mb-4'>Admin Login</h2>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Admin password'
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
          </Form.Group>
          {loginError && <Alert variant='danger'>{loginError}</Alert>}
          <Button type='submit' disabled={isCheckingLogin}>
            {isCheckingLogin ? 'Checking...' : 'Log in'}
          </Button>
        </Form>
      </Container>
    );
  }

  if (isLoadingData || !data) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' />
      </div>
    );
  }

  const updateData = (patch: Partial<SiteData>) => {
    setData((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  return (
    <Container className='py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2>Site Data Admin</h2>
        <Button variant='outline-secondary' size='sm' onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {saveError && <Alert variant='danger'>{saveError}</Alert>}
      {saveSuccess && <Alert variant='success'>{saveSuccess}</Alert>}

      <Tab.Container
        activeKey={activeSection}
        onSelect={(k) => setActiveSection((k as SectionKey) ?? 'me')}
      >
        <Nav variant='tabs' className='mb-4'>
          {SECTIONS.map((key) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={key}>{SECTION_LABELS[key]}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='me'>
            <MeSection
              about={data.about}
              onChange={(about) => updateData({ about })}
              cv={data.cv}
              onChangeCv={(cv) => updateData({ cv })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='work'>
            <WorkSection
              experience={data.experience}
              onChange={(experience) => updateData({ experience })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='code'>
            <CodeSection
              projects={data.projects}
              skills={data.skills}
              onChangeProjects={(projects) => updateData({ projects })}
              onChangeSkills={(skills) => updateData({ skills })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='write'>
            <WriteSection
              blogs={data.blogs}
              onChange={(blogs) => updateData({ blogs })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='read'>
            <ReadSection
              books={data.books}
              onChange={(books) => updateData({ books })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='study'>
            <StudySection
              study={data.study}
              onChange={(study) => updateData({ study })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='personalInfo'>
            <PersonalInfoSection
              personalInfo={data.personalInfo}
              onChange={(personalInfo) => updateData({ personalInfo })}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='leads'>
            <LeadsSection password={password} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <div className='mt-4'>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </Container>
  );
}

export default AdminApp;
