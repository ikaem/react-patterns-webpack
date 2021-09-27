import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const FormsPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [eventer, setEventer] = useState<any>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleClick = (synteticEvent: any) => {
    console.log(synteticEvent instanceof MouseEvent); // false
    console.log(synteticEvent.nativeEvent instanceof MouseEvent); // true
    console.log(synteticEvent);
  };

  const handleDoubleClick = (e: any) => {
    console.log('eouble click', { e });
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickToFocusInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    inputRef.current?.focus();
  };

  function handleEvent(e: React.MouseEvent) {
    const evPersisted = e.persist();
    console.log({ evPersisted });
    setEventer(e.persist());
    const { type } = e;
    console.log({ type });
    switch (type) {
      case 'click':
        console.log('click');
        break;
      case 'mouseenter':
        console.log('mouseenter');
        break;
      case 'mouseleave':
        console.log('mouseleave');
        break;
      case 'dblclick':
        console.log('doubleclick');
        break;
      default:
        return console.warn(`No case for event type "${type}"`);
    }
  }

  console.log({ eventer });

  const [inProp, setInProp] = useState(false);

  return (
    // <FormsStyled>
    <CSSTransition in={inProp} timeout={1000} className='my-node'>
      <div>
        <div>Hello</div>
        {/* <form>
        <input onChange={handleChange} type='text' value={value} />
        <button onClick={handleEvent} onDoubleClick={handleEvent} type='button'>
        {' '}
        Click
        </button>
        <button> Submit</button>
        </form>
        
      <form>
      <input ref={inputRef} type='text' />
      <button onClick={handleClickToFocusInput}>Click to focus</button>
    </form> */}

        <button onClick={() => setInProp((prev) => !prev)}>Hello</button>
      </div>
    </CSSTransition>
  );
};

export default FormsPage;

// export const FormsStyled = styled.div`
//   .my-node-enter {
//     opacity: 0;
//   }
//   .my-node-enter-active {
//     opacity: 1;
//     transition: opacity 200ms;
//   }
//   .my-node-exit {
//     opacity: 1;
//   }
//   .my-node-exit-active {
//     opacity: 0;
//     transition: opacity 200ms;
//   }
// `;

// const styl = styled.div``;
