'use client';

import { forwardRef } from 'react';
import { useTrigger, UseTriggerProps } from './use-trigger';

export type TriggerProps = UseTriggerProps;

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
  const { Component, buildComponentHandlerProps, domRef, ...restProps } = useTrigger({
    ref,
    ...props,
  });

  return <Component {...restProps} {...buildComponentHandlerProps()} ref={domRef} />;
});

Trigger.displayName = 'Trigger';
