import { Form } from 'react-bootstrap';
import { Experience } from '../../work/Work';
import ListEditor from '../ListEditor';
import ParagraphListEditor from '../ParagraphListEditor';

type Props = {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
};

function WorkSection({ experience, onChange }: Props) {
  return (
    <ListEditor
      items={experience}
      getKey={(_, i) => i}
      createItem={() => ({
        period: '',
        position: '',
        company: 'Moatable' as const,
        descriptionParagraphs: [''],
      })}
      addLabel='Add job'
      onChange={onChange}
      renderItem={(job, update) => (
        <>
          <Form.Group className='mb-2'>
            <Form.Label>Company</Form.Label>
            <Form.Select
              value={job.company}
              onChange={(e) =>
                update({ company: e.target.value as Experience['company'] })
              }
            >
              <option value='Moatable'>Moatable</option>
              <option value='SalesHood'>SalesHood</option>
            </Form.Select>
            <Form.Text muted>
              The role diagram (My Role / Tech Stack hexagons) is fixed per
              company and isn't editable here.
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Work time</Form.Label>
            <Form.Control
              type='text'
              placeholder='e.g. Feb 2025 - Now'
              value={job.period}
              onChange={(e) => update({ period: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Position</Form.Label>
            <Form.Control
              type='text'
              value={job.position}
              onChange={(e) => update({ position: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description paragraphs</Form.Label>
            <ParagraphListEditor
              paragraphs={job.descriptionParagraphs}
              onChange={(descriptionParagraphs) =>
                update({ descriptionParagraphs })
              }
            />
          </Form.Group>
        </>
      )}
    />
  );
}

export default WorkSection;
