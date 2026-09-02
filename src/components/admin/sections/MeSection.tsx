import { Form } from 'react-bootstrap';
import { About } from '../../me/Me';
import { CvFile } from '../../../types/siteData';
import ListEditor from '../ListEditor';
import ParagraphListEditor from '../ParagraphListEditor';

type Props = {
  about: About;
  onChange: (about: About) => void;
  cv: CvFile;
  onChangeCv: (cv: CvFile) => void;
};

function MeSection({ about, onChange, cv, onChangeCv }: Props) {
  return (
    <div>
      <Form.Group className='mb-4'>
        <Form.Label>Greeting</Form.Label>
        <Form.Control
          type='text'
          value={about.greeting}
          onChange={(e) => onChange({ ...about, greeting: e.target.value })}
        />
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label>Introduction paragraphs</Form.Label>
        <ParagraphListEditor
          paragraphs={about.introductionParagraphs}
          onChange={(introductionParagraphs) =>
            onChange({ ...about, introductionParagraphs })
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Social profiles</Form.Label>
        <ListEditor
          items={about.profiles}
          getKey={(_, i) => i}
          createItem={() => ({ type: 'github' as const, title: '', link: '' })}
          addLabel='Add profile'
          onChange={(profiles) => onChange({ ...about, profiles })}
          renderItem={(profile, update) => (
            <>
              <Form.Group className='mb-2'>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={profile.type}
                  onChange={(e) =>
                    update({
                      type: e.target.value as About['profiles'][number]['type'],
                    })
                  }
                >
                  <option value='github'>GitHub</option>
                  <option value='linkedin'>LinkedIn</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  value={profile.title}
                  onChange={(e) => update({ title: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type='text'
                  value={profile.link}
                  onChange={(e) => update({ link: e.target.value })}
                />
              </Form.Group>
            </>
          )}
        />
      </Form.Group>

      <hr className='my-4' />

      <h5 className='mb-3'>CV / Resume</h5>
      <p className='text-muted'>
        Shown as a downloadable file in the chat assistant whenever someone
        asks for Linh's CV or resume. Upload the PDF into{' '}
        <code>public/cv/</code> in the repo, then reference its path here.
      </p>
      <Form.Group className='mb-2'>
        <Form.Label>File path or URL</Form.Label>
        <Form.Control
          type='text'
          placeholder='./cv/your-file.pdf'
          value={cv.url}
          onChange={(e) => onChangeCv({ ...cv, url: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Display file name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Linh_Tran_CV.pdf'
          value={cv.fileName}
          onChange={(e) => onChangeCv({ ...cv, fileName: e.target.value })}
        />
      </Form.Group>
    </div>
  );
}

export default MeSection;
