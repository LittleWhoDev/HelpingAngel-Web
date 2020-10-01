import { useState } from 'react';

interface SliderHook {
  sliderState: Slider;
  setSliderState: (sldierState: Slider) => void;
  marks: SliderMarker[];
}

export function useSlider(initialValue: number): SliderHook {
  const initSliderState: Slider = {
    min: 30,
    max: 600,
    value: initialValue,
  };
  const [sliderState, setSliderState] = useState(initSliderState);

  const defaultMarks = [30, 300, 600];
  const marks = defaultMarks.map(
    (value): SliderMarker => ({ value, label: `${value} km` }),
  );

  return { sliderState, setSliderState, marks };
}

export interface Slider {
  min: number;
  max: number;
  value: number;
}

export interface SliderMarker {
  value: number;
  label: string;
}
