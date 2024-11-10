import { Slot } from '@radix-ui/react-slot';
import { useObjectRef } from '@react-aria/utils';
import {
  ComponentPropsWithoutRef,
  Ref,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { buildHandlerEvent } from './utils';

export type PointerType = 'all' | 'mouse' | 'touch' | 'pen' | 'keyboard';

export type TriggerAction =
  | 'click'
  | 'right-click'
  | 'double-click'
  | 'hover'
  | 'press'
  | 'long-press'
  | 'focus'
  | 'key-press';

export type UseTriggerProps = ComponentPropsWithoutRef<'button'> & {
  ref?: Ref<HTMLButtonElement> | null;
  asChild?: boolean;
  action?: TriggerAction | TriggerAction[];
  onTrigger?: (event: SyntheticEvent) => void;
  onTriggerEnd?: (event: SyntheticEvent) => void;
  onStartInteracting?: (event: SyntheticEvent) => void;
  onEndInteracting?: (event: SyntheticEvent) => void;
  propagation?: boolean;
  preventDefault?: boolean;
  pointerType?: PointerType;
  delay?: number;
  endDelay?: number;
  keyCode?: string;
  commandKey?: boolean;
  shiftKey?: boolean;
};

export const useTrigger = (props: UseTriggerProps) => {
  const {
    ref,
    asChild = false,
    action = 'click',
    onTrigger,
    onTriggerEnd,
    onStartInteracting,
    onEndInteracting,
    propagation = false,
    preventDefault = true,
    pointerType = 'all',
    delay = 0,
    endDelay = delay,
    keyCode,
    commandKey = false,
    shiftKey = false,
    ...restProps
  } = props;

  const Component = asChild ? Slot : 'button';
  const domRef = useObjectRef(ref);

  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isPressedRef = useRef(false);

  const actions = Array.isArray(action) ? action : [action];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const isCtrlPressed = event.ctrlKey || event.metaKey || !commandKey;
      const isShiftPressed = event.shiftKey || !shiftKey;

      if (keyCode && event.key === keyCode && isCtrlPressed && isShiftPressed) {
        buildHandlerEvent({
          event: event as unknown as SyntheticEvent<HTMLButtonElement>,
          triggerFn: onTrigger,
          interactionFn: onStartInteracting,
          preventDefault,
          propagation,
          delay,
          pointerType,
        });
      }
    };

    if (!actions.includes('key-press')) {
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    actions,
    keyCode,
    onTrigger,
    onStartInteracting,
    preventDefault,
    propagation,
    delay,
    pointerType,
    shiftKey,
    commandKey,
  ]);

  const buildComponentHandlerProps = useCallback((): ComponentPropsWithoutRef<'button'> => {
    const handlers: ComponentPropsWithoutRef<'button'> = {};

    actions.forEach((action) => {
      switch (action) {
        case 'click':
          handlers.onClick = (event) => {
            if (domRef.current?.getAttribute('data-long-pressed')) return;

            buildHandlerEvent({
              event,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          };
          break;
        case 'press':
          handlers.onPointerDown = (e) =>
            buildHandlerEvent<typeof e>({
              event: e,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          handlers.onPointerUp = (e) => {
            if (domRef.current?.getAttribute('data-long-pressed')) return;

            buildHandlerEvent({
              event: e,
              triggerFn: onTriggerEnd,
              interactionFn: onEndInteracting,
              preventDefault,
              propagation,
              delay: endDelay,
              pointerType,
            });
          };
          break;
        case 'hover':
          handlers.onMouseEnter = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          handlers.onMouseLeave = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTriggerEnd,
              interactionFn: onEndInteracting,
              preventDefault,
              propagation,
              delay: endDelay,
              pointerType,
            });
          break;
        case 'focus':
          handlers.onFocus = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          handlers.onBlur = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTriggerEnd,
              interactionFn: onEndInteracting,
              preventDefault,
              propagation,
              delay: endDelay,
              pointerType,
            });
          break;
        case 'right-click':
          handlers.onContextMenu = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          break;
        case 'double-click':
          handlers.onDoubleClick = (e) =>
            buildHandlerEvent({
              event: e,
              triggerFn: onTrigger,
              interactionFn: onStartInteracting,
              preventDefault,
              propagation,
              delay,
              pointerType,
            });
          break;
        case 'long-press':
          handlers.onPointerDown = (event: any) => {
            if (isPressedRef.current) return;

            isPressedRef.current = true;

            pressTimerRef.current = setTimeout(() => {
              domRef.current?.setAttribute('data-long-pressed', 'true');
              buildHandlerEvent({
                event,
                triggerFn: onTrigger,
                interactionFn: onStartInteracting,
                preventDefault,
                propagation,
                delay: 0,
                pointerType,
              });
            }, delay);
          };
          handlers.onPointerUp = (event: any) => {
            if (pressTimerRef.current) {
              clearTimeout(pressTimerRef.current);
              pressTimerRef.current = null;
            }

            if (isPressedRef.current) {
              buildHandlerEvent({
                event,
                triggerFn: onTriggerEnd,
                interactionFn: onEndInteracting,
                preventDefault,
                propagation,
                delay: 0,
                pointerType,
              });
              isPressedRef.current = false;
              setTimeout(() => {
                domRef.current?.removeAttribute('data-long-pressed');
              }, 100);
            }
          };
          break;
        default:
          break;
      }
    });

    return handlers;
  }, [
    actions,
    onTrigger,
    onTriggerEnd,
    onStartInteracting,
    onEndInteracting,
    preventDefault,
    propagation,
    delay,
    endDelay,
    pointerType,
  ]);

  return { Component, buildComponentHandlerProps, domRef, ...restProps };
};
