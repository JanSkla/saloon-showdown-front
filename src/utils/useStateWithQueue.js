import { useState, useEffect, useRef } from 'react';

function useStateWithQueue(initialValue) {
  const [state, setState] = useState(initialValue);
  const [queue, setQueue] = useState([]);
  const processingRef = useRef(false);

  const addToQueue = (value) => {
    setQueue((prevQueue) => [...prevQueue, value]);

    if (!processingRef.current) {
      processingRef.current = true;
      processQueue();
    }
  };

  const processQueue = () => {
    setQueue((prevQueue) => {
      if (prevQueue.length === 0) {
        processingRef.current = false;
        return prevQueue;
      }
      const [nextValue, ...restQueue] = prevQueue;
      setState(nextValue);
      return restQueue;
    });
  };

  useEffect(() => {
    if (queue.length > 0) {
      processQueue();
    }
  }, [queue]);

  return [state, addToQueue];
}

export default useStateWithQueue;
