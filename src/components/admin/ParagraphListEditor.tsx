import { Button, Form } from 'react-bootstrap';

type Props = {
  paragraphs: string[];
  onChange: (paragraphs: string[]) => void;
};

function ParagraphListEditor({ paragraphs, onChange }: Props) {
  const updateParagraph = (index: number, value: string) => {
    onChange(paragraphs.map((p, i) => (i === index ? value : p)));
  };

  const removeParagraph = (index: number) => {
    onChange(paragraphs.filter((_, i) => i !== index));
  };

  const addParagraph = () => {
    onChange([...paragraphs, '']);
  };

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className='d-flex mb-2 gap-2'>
          <Form.Control
            as='textarea'
            rows={2}
            value={paragraph}
            onChange={(e) => updateParagraph(index, e.target.value)}
          />
          <Button
            variant='outline-danger'
            size='sm'
            onClick={() => removeParagraph(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant='outline-primary' size='sm' onClick={addParagraph}>
        Add paragraph
      </Button>
    </div>
  );
}

export default ParagraphListEditor;
