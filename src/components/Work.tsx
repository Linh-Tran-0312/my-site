import parse from 'html-react-parser';
import { forwardRef } from 'react';
import SectionWrapper from './SectionWrapper';
export type Experience = {
  period: string;
  position: string;
  company: string;
  description: string;
};
const Work = forwardRef<HTMLDivElement, { experience: Experience[] }>(
  ({ experience }, ref) => {
    return (
      <SectionWrapper ref={ref} title='💻 Where I work'>
        {experience.map((e) => (
          <div className='mt-4'>
            <div className='d-flex w-100 justify-content-between'>
              <h5>
                <strong>{e.company}</strong>
              </h5>
              <p>{e.period}</p>
            </div>
            <p className='text-secondary'>{e.position}</p>
            {parse(e.description)}
          </div>
        ))}
      </SectionWrapper>
    );
  }
);

export default Work;
