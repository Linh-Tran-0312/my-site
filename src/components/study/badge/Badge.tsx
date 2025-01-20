import './Badge.css';
export type BadgeProps = {
  title: string;
  subtitle: string;
  logo: string;
  link: string;
};

function Badge({ title, subtitle, logo, link }: BadgeProps) {
  return (
    <div className='badge__container' data-ribbon={title}>
      <div className='mt-3 ps-3'>
        <img src={logo} width='50px' height='auto' className='mb-1' />
      </div>
      <div>
        <a
          href={`${location.href}${link}`}
          target='_blank'
          className='badge__link'
        >
          <span title='View this certification' className='pointer'>
            {subtitle}
          </span>
        </a>
      </div>
    </div>
  );
}

export default Badge;
