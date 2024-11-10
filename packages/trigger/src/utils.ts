import { SyntheticEvent } from 'react';
import { PointerType } from './use-trigger';

export const isPointerTypeValid = (event: any, pointerType: PointerType) => {
  if (event?.nativeEvent?.pointerType) {
    return pointerType === 'all' || event.nativeEvent.pointerType === pointerType;
  }
  if (event?.pointerType) {
    return pointerType === 'all' || event.pointerType === pointerType;
  }
  return true;
};

type BuildHandlerEventOptions<T extends SyntheticEvent<HTMLButtonElement>> = {
  event: T;
  interactionFn: (event: T) => void;
  triggerFn: (event: T) => void;
  preventDefault: boolean;
  propagation: boolean;
  delay: number;
  pointerType: PointerType;
};

export const buildHandlerEvent = <T extends SyntheticEvent<HTMLButtonElement>>(
  options: BuildHandlerEventOptions<T>,
) => {
  const { event, interactionFn, triggerFn, preventDefault, propagation, pointerType, delay } =
    options;

  if (preventDefault) {
    event.preventDefault();
  }
  if (!propagation) {
    event.stopPropagation();
  }

  if (!isPointerTypeValid(event, pointerType)) return;

  interactionFn?.(event);

  if (delay > 0) {
    setTimeout(() => triggerFn?.(event), delay);
  } else {
    triggerFn?.(event);
  }
};
