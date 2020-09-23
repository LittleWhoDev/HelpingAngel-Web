import { MapContext } from '@/hooks/map';
import React, { useState, useContext } from 'react';

interface Slider {
  min: number;
  max: number;
  value: number;
}

const Filter: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState('');

  const { filters, setFilters } = useContext(MapContext);

  const initSliderState: Slider = {
    min: 1,
    max: 600,
    value: filters.range,
  };

  const [sliderState, setSliderState] = useState(initSliderState);

  const handleSliderMouseUp = (elem): void => {
    setFilters({ ...filters, range: elem.value });
  };

  const handleSliderChange = (value): void => {
    setSliderState({ ...sliderState, value });
  };

  return (
    <div>
      <input
        type="range"
        min={sliderState.min}
        max={sliderState.max}
        value={sliderState.value}
        className="slider"
        onMouseUp={(e) => handleSliderMouseUp(e.target)}
        onChange={(e) => handleSliderChange(e.target.value)}
      />
      <p style={{ display: 'inline' }}>{sliderState.value} km</p>
      <br />
      <input
        type="text"
        name="search"
        placeholder="Type..."
        value={filters.text}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setFilters({ ...filters, text: searchText })}
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
