import React from 'react';

interface Props {
  choices: string[];
  callback: (choice: string) => void;
}

const Selector: React.FC<Props> = ({ choices, callback }) => (
  <>
    {choices.map((choice) => (
      <button type="button" key={choice} onClick={() => callback(choice)}>
        {choice}
      </button>
    ))}
  </>
);
export default Selector;
