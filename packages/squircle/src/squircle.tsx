'use client';

import { useEffect, useState } from 'react';
import { HaveSmoothing } from './have-smoothing';
import { NoSmoothing } from './no-smooting';
import { UseSquircleProps } from './use-squircle';
import { getVariableFromRoot } from './get-var-from-root';

export interface SquircleProps extends UseSquircleProps {}

export const Squircle = (props: SquircleProps) => {
  const { smoothing } = props;

  const [componentSmoothing, setComponentSmoothing] = useState(0);

  useEffect(() => {
    const smooth =
      typeof smoothing === 'undefined'
        ? Number(getVariableFromRoot('--corner-smoothing'))
        : smoothing;

    if (smooth !== 0 && typeof smooth === 'number') {
      setComponentSmoothing(smooth);
    }
  }, [smoothing]);

  return componentSmoothing > 0 ? (
    <HaveSmoothing smoothing={componentSmoothing} {...props} />
  ) : (
    <NoSmoothing {...props} />
  );
};
