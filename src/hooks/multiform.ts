import { useState } from 'react';

interface MultiformInternalState {
  steps: JSX.Element[];
}

export interface MultiformState {
  step: JSX.Element;
}

export interface MultiformActions {
  next: () => JSX.Element | undefined;
  prev: () => JSX.Element | undefined;
}

const useMultiform = (
  initialState: MultiformInternalState,
): MultiformState & MultiformActions => {
  const [currentPage, setCurrentPage] = useState(0);

  return {
    step: initialState.steps[currentPage],
    next: () => {
      const nextStep =
        currentPage + 1 === initialState.steps.length
          ? undefined
          : initialState.steps[currentPage + 1];

      if (nextStep !== undefined) setCurrentPage(currentPage + 1);
      return nextStep;
    },
    prev: () => {
      const prevStep =
        currentPage - 1 === -1
          ? undefined
          : initialState.steps[currentPage - 1];

      if (prevStep !== undefined) setCurrentPage(currentPage - 1);
      return prevStep;
    },
  };
};
export default useMultiform;
