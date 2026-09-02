import { Form } from 'react-bootstrap';
import { PersonalInfoItem } from '../../../types/siteData';
import ListEditor from '../ListEditor';

type Props = {
  personalInfo: PersonalInfoItem[];
  onChange: (personalInfo: PersonalInfoItem[]) => void;
};

function PersonalInfoSection({ personalInfo, onChange }: Props) {
  return (
    <div>
      <p className='text-muted'>
        Freeform facts about Linh for the AI assistant to use as extra
        context. These aren't shown anywhere on the public site — only fed
        into the chat assistant's knowledge.
      </p>
      <ListEditor
        items={personalInfo}
        getKey={(_, i) => i}
        createItem={() => ({ topic: '', content: '' })}
        addLabel='Add info'
        onChange={onChange}
        renderItem={(item, update) => (
          <>
            <Form.Group className='mb-2'>
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g. Hobbies, Favorite tools, Fun facts'
                value={item.topic}
                onChange={(e) => update({ topic: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={item.content}
                onChange={(e) => update({ content: e.target.value })}
              />
            </Form.Group>
          </>
        )}
      />
    </div>
  );
}

export default PersonalInfoSection;
