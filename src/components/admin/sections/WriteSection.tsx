import { Form } from 'react-bootstrap';
import { CardProps } from '../../share/custom-card/CustomCard';
import ListEditor from '../ListEditor';

type Props = {
  blogs: CardProps[];
  onChange: (blogs: CardProps[]) => void;
};

const nextId = (items: { id: number }[]) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

function WriteSection({ blogs, onChange }: Props) {
  return (
    <ListEditor
      items={blogs}
      getKey={(b) => b.id}
      createItem={() => ({
        id: nextId(blogs),
        category: '',
        title: '',
        description: '',
        thumbnail: '',
        link: '',
        tooltip: '',
      })}
      addLabel='Add blog post'
      onChange={onChange}
      renderItem={(blog, update) => (
        <>
          <Form.Group className='mb-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={blog.category}
              onChange={(e) => update({ category: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={blog.title}
              onChange={(e) => update({ title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={2}
              value={blog.description}
              onChange={(e) => update({ description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Thumbnail (path or URL)</Form.Label>
            <Form.Control
              type='text'
              value={blog.thumbnail}
              onChange={(e) => update({ thumbnail: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Link</Form.Label>
            <Form.Control
              type='text'
              value={blog.link}
              onChange={(e) => update({ link: e.target.value })}
            />
          </Form.Group>
        </>
      )}
    />
  );
}

export default WriteSection;
