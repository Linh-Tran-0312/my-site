import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HexCell } from './hexTypes';
import './Hexagon.css';

// The honeycomb math needs a pixel width up front (it drives height and
// overlap margins too, not just width), so it can't be plain CSS
// percentages. 500px matches the original desktop design; on narrower
// screens we shrink to the actual measured container width so hexes
// scale down instead of wrapping onto extra lines.
const MAX_DESIGN_WIDTH = 500;

type Slot = HexCell | null;

// Reading order is a flat list, walked column by column: odd columns
// (1st, 3rd, 5th...) hold 2 cells (top, bottom), even columns hold 1
// cell (vertically centered in the gap). This mirrors the CSS honeycomb
// trick below, which offsets every 2nd hex in each row downward.
function toRows(cells: HexCell[]): { top: Slot[]; bottom: Slot[] } {
  const top: Slot[] = [];
  const bottom: Slot[] = [];
  let i = 0;
  let column = 1;
  while (i < cells.length) {
    if (column % 2 === 1) {
      top.push(cells[i] ?? null);
      bottom.push(cells[i + 1] ?? null);
      i += 2;
    } else {
      top.push(cells[i] ?? null);
      bottom.push(null);
      i += 1;
    }
    column += 1;
  }
  return { top, bottom };
}

type Props = {
  cells: HexCell[];
};

function HexagonDiagram({ cells }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wrp, setWrp] = useState(MAX_DESIGN_WIDTH);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  const handleClose = () => setShow(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const measure = () => setWrp(Math.min(el.clientWidth, MAX_DESIGN_WIDTH));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCellClick = (cell: HexCell) => {
    if (cell.link) {
      return;
    }
    if (cell.popupContentHtml) {
      setItem({ title: cell.popupTitle ?? '', content: cell.popupContentHtml });
      setShow(true);
    }
  };

  const renderSlot = (slot: Slot, key: string) => {
    if (!slot) {
      return <div key={key} className='hex hex-empty' />;
    }

    const inner = slot.imageUrl ? (
      <img src={slot.imageUrl} width='100%' alt={slot.label || 'hexagon'} />
    ) : (
      slot.label
    );

    const style = { backgroundColor: slot.bgColor, color: slot.textColor };

    if (slot.link) {
      return (
        <a
          key={key}
          className='hex pointer'
          style={style}
          title={slot.tooltip}
          href={slot.link}
          target='_blank'
          rel='noopener noreferrer'
        >
          {inner}
        </a>
      );
    }

    return (
      <div
        key={key}
        className='hex pointer'
        style={style}
        title={slot.tooltip}
        onClick={() => handleCellClick(slot)}
      >
        {inner}
      </div>
    );
  };

  const { top, bottom } = toRows(cells);

  return (
    <div className='w-100'>
      <Modal show={show} centered onHide={handleClose} className='text-default'>
        <Modal.Header className='bg-default'>
          <strong>{item.title}</strong>
        </Modal.Header>
        <Modal.Body className='bg-default rounded'>
          {parse(item.content)}
        </Modal.Body>
      </Modal>
      <div
        className='w-100 hex-container'
        ref={containerRef}
        style={{ '--wrp': `${wrp}px` } as React.CSSProperties}
      >
        <div className='hex-wrap'>
          {top.map((slot, i) => renderSlot(slot, `top-${i}`))}
        </div>
        <div className='hex-wrap'>
          {bottom.map((slot, i) => renderSlot(slot, `bottom-${i}`))}
        </div>
      </div>
    </div>
  );
}

export default HexagonDiagram;
