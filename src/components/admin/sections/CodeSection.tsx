import { Form } from 'react-bootstrap';
import { Skill } from '../../code/Code';
import { CardProps } from '../../share/custom-card/CustomCard';
import ListEditor from '../ListEditor';

type Props = {
  projects: CardProps[];
  skills: Skill[];
  onChangeProjects: (projects: CardProps[]) => void;
  onChangeSkills: (skills: Skill[]) => void;
};

const nextId = (items: { id: number }[]) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

function CodeSection({
  projects,
  skills,
  onChangeProjects,
  onChangeSkills,
}: Props) {
  return (
    <div>
      <h5 className='mb-3'>Project cards</h5>
      <ListEditor
        items={projects}
        getKey={(p) => p.id}
        createItem={() => ({
          id: nextId(projects),
          category: '',
          title: '',
          description: '',
          thumbnail: '',
          link: '',
          tooltip: '',
        })}
        addLabel='Add project'
        onChange={onChangeProjects}
        renderItem={(project, update) => (
          <>
            <Form.Group className='mb-2'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={project.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={2}
                value={project.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Thumbnail (path or URL)</Form.Label>
              <Form.Control
                type='text'
                value={project.thumbnail}
                onChange={(e) => update({ thumbnail: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='text'
                value={project.link}
                onChange={(e) => update({ link: e.target.value })}
              />
            </Form.Group>
          </>
        )}
      />

      <h5 className='mb-3 mt-5'>My Skills</h5>
      <ListEditor
        items={skills}
        getKey={(_, i) => i}
        createItem={() => ({ label: '', value: '' })}
        addLabel='Add skill category'
        onChange={onChangeSkills}
        renderItem={(skill, update) => (
          <>
            <Form.Group className='mb-2'>
              <Form.Label>Category label</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. Frontend'
                value={skill.label}
                onChange={(e) => update({ label: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. React, Redux, Vite'
                value={skill.value}
                onChange={(e) => update({ value: e.target.value })}
              />
            </Form.Group>
          </>
        )}
      />
    </div>
  );
}

export default CodeSection;
