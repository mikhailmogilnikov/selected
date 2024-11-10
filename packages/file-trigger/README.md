# FileTrigger

The `FileTrigger` component is a React component designed to handle file uploads.

## Installation

```bash
npm install @mikhailmogilnikov/file-trigger
```

## Usage

### Basic Example

```tsx
import { FileTrigger } from '@mikhailmogilnikov/file-trigger';

<FileTrigger onAttach={(files) => console.log('Files uploaded:', files)}>
  Upload Files
</FileTrigger>
```



### Advanced Example

```tsx
<FileTrigger
  id='images' // passes directly to input
  name='images'
  fileType="image"
  fileLimitBytes={5000000} // File size limit in bytes
  onAttach={(files) => console.log('Images uploaded:', files)}
  onLimit={(file) => console.log('File too large:', file)}
>
  <Button>Upload Images</Button>
</FileTrigger>
```

Any jsx inside will open file dialog on click.

## Props

| Prop               | Description                                                     | Type                            | Default     |
| ------------------ | --------------------------------------------------------------- | ------------------------------- | ----------- |
| `ref`              | Ref to the input element.                                       | `Ref<HTMLInputElement> \| null` | `null`      |
| `onAttach`         | Callback function when files are uploaded.                      | `(files: FileList) => void`     | `undefined` |
| `fileLimitBytes`   | File size limit in bytes.                                       | `number`                        | `undefined` |
| `onLimit`          | Callback function when a file exceeds the size limit.           | `(file: File) => void`          | `undefined` |
| `disableAutoClear` | If `true`, does not clear the input value after file selection. | `boolean`                       | `false`     |
| `showInput`        | If `true`, displays the input element.                          | `boolean`                       | `false`     |
| `fileType`         | Type of file that can be uploaded.                              | `FileType`                      | `'all'`     |

\+ all props from `input` element.

## Examples

### Image Upload

```tsx
<FileTrigger
  fileType="image"
  onAttach={(files) => console.log('Images uploaded:', files)}
>
  Upload Images
</FileTrigger>
```

### File Size Limitation

```tsx
<FileTrigger
  fileLimitBytes={1000000} // 1 MB
  onLimit={(file) => console.log('File too large:', file)}
>
  Upload File
</FileTrigger>
```

## Types

### FileType

`FileType` is a union type that defines the types of files that can be uploaded. It can be one of the following:

- `'image'`: Images.
- `'video'`: Videos.
- `'pdf'`: PDF files.
- `'audio'`: Audio files.
- `'text'`: Text files.
- `'all'`: All file types.
