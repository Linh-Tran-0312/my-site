import { useState } from 'react';
import './style.css';
const blogs = [
  { title: 'My First Blog Post', description: 'Introduction to my new blog.' },
  {
    title: 'Learning React',
    description: 'My journey learning React and its ecosystem.',
  },
  {
    title: 'Mastering CSS',
    description: 'Tips and tricks for CSS layouts and styling.',
  },
];
const TerminalPage = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  const processCommand = (command: string) => {
    if (command.trim().toLowerCase() === 'blogs') {
      setOutput((prevOutput) => [
        ...prevOutput,
        'Fetching blogs...',
        ...blogs.map((blog) => `${blog.title}: ${blog.description}`),
      ]);
    } else {
      setOutput((prevOutput) => [
        ...prevOutput,
        `Unknown command: "${command}"`,
      ]);
    }
  };

  return (
    <div className='terminal'>
      <div className='output'>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className='input-line'>
        <span className='prompt'>linhtran$</span>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </div>
    </div>
  );
};
export default TerminalPage;
