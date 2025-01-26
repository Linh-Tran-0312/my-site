import './CustcomCard.css';
export type CardProps = {
  id: number;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  tooltip: string;
};

export const CustomCard = (props: CardProps) => {
  return (
    <div className='custom-card'>
      <div className='custom-card__content'>
        <p className='custom-card__category'>{props.category}</p>
        <a href={props.link} target='_blank'>
          <h2 className='custom-card__title' title={props.tooltip}>
            {props.title}
          </h2>
        </a>
        <p className='custom-card__subtitle'>{props.description}</p>
      </div>
      <div className='custom-card__image'>
        <img src={props.thumbnail} alt='props thumbnail' />
      </div>
    </div>
  );
};
