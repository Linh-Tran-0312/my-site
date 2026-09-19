import { Form } from 'react-bootstrap';
import { HexCell } from '../../work/Hexagons/hexTypes';
import { Experience } from '../../work/Work';
import ListEditor from '../ListEditor';
import ParagraphListEditor from '../ParagraphListEditor';

type Props = {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
};

const createHexCell = (): HexCell => ({
  id: crypto.randomUUID(),
  label: '',
  bgColor: '#356D9B',
  textColor: '#FFFFFF',
});

function WorkSection({ experience, onChange }: Props) {
  return (
    <ListEditor
      items={experience}
      getKey={(_, i) => i}
      createItem={() => ({
        period: '',
        position: '',
        company: '',
        descriptionParagraphs: [''],
        hexagons: [],
      })}
      addLabel='Add job'
      onChange={onChange}
      renderItem={(job, update) => (
        <>
          <Form.Group className='mb-2'>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type='text'
              value={job.company}
              onChange={(e) => update({ company: e.target.value })}
            />
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
          <Form.Group className='mb-3'>
            <Form.Label>Description paragraphs</Form.Label>
            <ParagraphListEditor
              paragraphs={job.descriptionParagraphs}
              onChange={(descriptionParagraphs) =>
                update({ descriptionParagraphs })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Role diagram (hexagons)</Form.Label>
            <Form.Text muted className='d-block mb-2'>
              Reading order fills columns top-to-bottom: odd columns (1st,
              3rd...) take 2 hexagons, even columns take 1, alternating. Leave
              "Popup content" empty for a hexagon that isn't clickable (e.g.
              a plain logo). Set "Link URL" to make the hexagon open a site
              instead of a popup.
            </Form.Text>
            <ListEditor
              items={job.hexagons}
              getKey={(cell) => cell.id}
              getTitle={(cell, i) => cell.label || `Hexagon ${i + 1}`}
              createItem={createHexCell}
              addLabel='Add hexagon'
              onChange={(hexagons) => update({ hexagons })}
              renderItem={(cell, updateCell) => (
                <>
                  <Form.Group className='mb-2'>
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                      type='text'
                      value={cell.label}
                      onChange={(e) => updateCell({ label: e.target.value })}
                    />
                  </Form.Group>
                  <div className='d-flex gap-3 mb-2'>
                    <Form.Group>
                      <Form.Label>Background color</Form.Label>
                      <Form.Control
                        type='color'
                        value={cell.bgColor || '#356D9B'}
                        onChange={(e) =>
                          updateCell({ bgColor: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Text color</Form.Label>
                      <Form.Control
                        type='color'
                        value={cell.textColor || '#FFFFFF'}
                        onChange={(e) =>
                          updateCell({ textColor: e.target.value })
                        }
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className='mb-2'>
                    <Form.Label>Image (path or URL, optional)</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='./work/logo.png'
                      value={cell.imageUrl ?? ''}
                      onChange={(e) =>
                        updateCell({ imageUrl: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Link URL (optional)</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='https://example.com'
                      value={cell.link ?? ''}
                      onChange={(e) => updateCell({ link: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Tooltip (optional)</Form.Label>
                    <Form.Control
                      type='text'
                      value={cell.tooltip ?? ''}
                      onChange={(e) =>
                        updateCell({ tooltip: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>Popup title</Form.Label>
                    <Form.Control
                      type='text'
                      value={cell.popupTitle ?? ''}
                      onChange={(e) =>
                        updateCell({ popupTitle: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Popup content (HTML allowed)</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={4}
                      value={cell.popupContentHtml ?? ''}
                      onChange={(e) =>
                        updateCell({ popupContentHtml: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
              )}
            />
          </Form.Group>
        </>
      )}
    />
  );
}

export default WorkSection;
