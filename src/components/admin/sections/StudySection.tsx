import { Form } from 'react-bootstrap';
import { StudyProps } from '../../study/Study';
import ListEditor from '../ListEditor';

type Props = {
  study: StudyProps;
  onChange: (study: StudyProps) => void;
};

function StudySection({ study, onChange }: Props) {
  return (
    <div>
      <p className='text-muted'>
        Education details aren't editable here yet — only certificates.
      </p>
      <ListEditor
        items={study.certificates.details}
        getKey={(_, i) => i}
        createItem={() => ({ title: '', subtitle: '', logo: '', link: '' })}
        addLabel='Add certificate'
        onChange={(details) =>
          onChange({
            ...study,
            certificates: { ...study.certificates, details },
          })
        }
        renderItem={(cert, update) => (
          <>
            <Form.Group className='mb-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. Cloud, AI, Agile'
                value={cert.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Certificate name</Form.Label>
              <Form.Control
                type='text'
                value={cert.subtitle}
                onChange={(e) => update({ subtitle: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Logo (path or URL)</Form.Label>
              <Form.Control
                type='text'
                value={cert.logo}
                onChange={(e) => update({ logo: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='text'
                value={cert.link}
                onChange={(e) => update({ link: e.target.value })}
              />
            </Form.Group>
          </>
        )}
      />
    </div>
  );
}

export default StudySection;
