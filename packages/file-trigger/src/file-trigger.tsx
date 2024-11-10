import { forwardRef } from 'react';
import { useFileTrigger, UseFileTriggerProps } from './use-file-trigger';

export type FileTriggerProps = UseFileTriggerProps;

export const FileTrigger = forwardRef<HTMLInputElement, FileTriggerProps>((props, ref) => {
  const { domRef, children, buildWrapperProps, buildInputProps } = useFileTrigger({
    ref,
    ...props,
  });

  return (
    <div {...buildWrapperProps()}>
      <input ref={domRef} {...buildInputProps()} />
      {children}
    </div>
  );
});

FileTrigger.displayName = 'FileTrigger';
