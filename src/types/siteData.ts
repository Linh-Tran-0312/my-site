import { Skill } from '../components/code/Code';
import { About } from '../components/me/Me';
import { Nav } from '../components/nav/Nav';
import { Book } from '../components/read/Read';
import { CardProps } from '../components/share/custom-card/CustomCard';
import { StudyProps } from '../components/study/Study';
import { Experience } from '../components/work/Work';

export type PersonalInfoItem = {
  topic: string;
  content: string;
};

export type CvFile = {
  url: string;
  fileName: string;
};

export type SiteData = {
  about: About;
  nav: Nav;
  skills: Skill[];
  projects: CardProps[];
  blogs: CardProps[];
  experience: Experience[];
  study: StudyProps;
  books: Book[];
  personalInfo: PersonalInfoItem[];
  cv: CvFile;
};
