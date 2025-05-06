import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';
import type { RootState } from '../../app/store';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1> Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>{' '}
      <button onClick={() => dispatch(decrement())}>Decrement</button>{' '}
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default Counter;
