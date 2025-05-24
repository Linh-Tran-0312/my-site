import './Badge.css';
export type BadgeProps = {
  title: string;
  subtitle: string;
  logo: string;
  link: string;
};

function Badge({ title, subtitle, logo, link }: BadgeProps) {
  return (
    <div className='badge__container' data-ribbon={title.padStart(10, ' ')}>
      <div className='mt-3 ps-3'>
        <img src={logo} width='50px' />
      </div>
      <div>
        <a
          href={`${location.href}${link}`}
          target='_blank'
          className='badge__link'
        >
          <span
            title='View this certification'
            className='pointer badge__title'
          >
            {subtitle}
          </span>
        </a>
      </div>
    </div>
  );
}

export default Badge;
