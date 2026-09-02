import { Button, Card } from 'react-bootstrap';

type ListEditorProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
  addLabel?: string;
  getKey: (item: T, index: number) => string | number;
};

function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  addLabel = 'Add item',
  getKey,
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
