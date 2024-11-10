import { useObjectRef } from '@react-aria/utils';
import { ComponentPropsWithoutRef, Ref, useCallback, useId } from 'react';

export type FileType = 'image' | 'video' | 'pdf' | 'audio' | 'text' | 'all';

export type UseFileTriggerProps = ComponentPropsWithoutRef<'input'> & {
  ref?: Ref<HTMLInputElement> | null;

  onAttach?: (files: FileList) => void;

  fileLimitBytes?: number;
  onLimit?: (file: File) => void;

  disableAutoClear?: boolean;
  showInput?: boolean;
  fileType?: FileType;
};

const fileTypeAcceptMap: Record<FileType, string> = {
  image: 'image/*',
  video: 'video/*',
  pdf: 'application/pdf',
  audio: 'audio/*',
  text: 'text/*',
  all: '*/*',
};

export const useFileTrigger = (props: UseFileTriggerProps) => {
  const {
    ref,
    multiple = false,
    accept,
    onChange,
    onAttach,
    onLimit,
    onClick,
    children,
    id,
    disableAutoClear = false,
    showInput = false,
    fileType = 'all',
    fileLimitBytes,
    ...restProps
  } = props;

  const domRef = useObjectRef(ref);
  const inputId = useId();

  const buildWrapperProps = useCallback(
    () => ({
      onClick: () => !showInput && domRef.current?.click(),
    }),
    [showInput],
  );

  const buildInputProps = useCallback(
    () => ({
      ...restProps,
      type: 'file',
      id: id || inputId,
      multiple,
      accept: accept || fileTypeAcceptMap[fileType],
      onChange: (e) => {
        const files = e.target.files;

        if (fileLimitBytes && files) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (fileLimitBytes && file.size > fileLimitBytes) {
              onLimit?.(file);
              return;
            }
          }
        }
        onChange?.(e);
        onAttach?.(files);
      },
      onClick: (e) => {
        if (!disableAutoClear) {
          e.target.value = null;
        }
        onClick?.(e);
      },
      style: { display: !showInput ? 'none' : undefined },
    }),
    [id, multiple, accept, onChange, showInput, fileType, fileLimitBytes, onLimit],
  );

  return { domRef, children, buildWrapperProps, buildInputProps };
};
