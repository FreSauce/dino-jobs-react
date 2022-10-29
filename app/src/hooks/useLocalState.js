import { useEffect } from "react";
import { useState } from "react";

const useLocalState = (stateVar) => {
  const [state, setState] = useState(localStorage.getItem(stateVar));

  useEffect(() => {
    if (state !== null) {
      localStorage.setItem(stateVar, state);
    } else {
      localStorage.removeItem(stateVar);
    }
  }, [state]);
  return [state, setState];
};

export default useLocalState;
