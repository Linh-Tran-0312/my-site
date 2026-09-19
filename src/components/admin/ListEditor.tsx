import { Accordion, Button, Card } from 'react-bootstrap';

type ListEditorProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
  addLabel?: string;
  getKey: (item: T, index: number) => string | number;
  // When set, each item renders as a collapsed accordion panel titled by
  // this instead of an always-open card. Handy for long per-item forms.
  getTitle?: (item: T, index: number) => string;
};

function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  addLabel = 'Add item',
  getKey,
  getTitle,
}: ListEditorProps<T>) {
  const updateItem = (index: number, patch: Partial<T>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, createItem()]);
  };

  if (getTitle) {
    return (
      <div>
        <Accordion alwaysOpen>
          {items.map((item, index) => (
            <Accordion.Item
              key={getKey(item, index)}
              eventKey={String(getKey(item, index))}
            >
              <Accordion.Header>
                {getTitle(item, index) || `Item ${index + 1}`}
              </Accordion.Header>
              <Accordion.Body>
                {renderItem(item, (patch) => updateItem(index, patch))}
                <div className='text-end mt-2'>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Button
          variant='outline-primary'
          size='sm'
          className='mt-3'
          onClick={addItem}
        >
          {addLabel}
        </Button>
      </div>
    );
  }

  return (
    <div>
      {items.map((item, index) => (
        <Card key={getKey(item, index)} className='mb-3'>
          <Card.Body>
            {renderItem(item, (patch) => updateItem(index, patch))}
            <div className='text-end mt-2'>
              <Button
                variant='outline-danger'
                size='sm'
                onClick={() => removeItem(index)}
              >
                Remove
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <Button variant='outline-primary' size='sm' onClick={addItem}>
        {addLabel}
      </Button>
    </div>
  );
}

export default ListEditor;
