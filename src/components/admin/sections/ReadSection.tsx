import { Form } from 'react-bootstrap';
import { Book } from '../../read/Read';
import ListEditor from '../ListEditor';

type Props = {
  books: Book[];
  onChange: (books: Book[]) => void;
};

const DEFAULT_COLORS = ['#A6C8E0', '#A6D8C3', '#E1AFD1', '#CCBDA0', '#9CB7D3'];

function ReadSection({ books, onChange }: Props) {
  return (
    <ListEditor
      items={books}
      getKey={(_, i) => i}
      createItem={() => ({
        title: '',
        author: '',
        link: '',
        color: DEFAULT_COLORS[books.length % DEFAULT_COLORS.length],
        width: '96%',
        height: '24%',
        margin: 10,
      })}
      addLabel='Add book'
      onChange={onChange}
      renderItem={(book, update) => (
        <>
          <Form.Group className='mb-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={book.title}
              onChange={(e) => update({ title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              value={book.author}
              onChange={(e) => update({ author: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Link</Form.Label>
            <Form.Control
              type='text'
              value={book.link}
              onChange={(e) => update({ link: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Card background color</Form.Label>
            <div className='d-flex align-items-center gap-2'>
              <Form.Control
                type='color'
                value={book.color}
                onChange={(e) => update({ color: e.target.value })}
                style={{ width: 48, padding: 2 }}
                title='Pick a color'
              />
              <Form.Control
                type='text'
                value={book.color}
                onChange={(e) => update({ color: e.target.value })}
              />
            </div>
          </Form.Group>
        </>
      )}
    />
  );
}

export default ReadSection;
