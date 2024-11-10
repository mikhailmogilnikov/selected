'use client';

import { FileTrigger } from '../../../packages/file-trigger/src';

export default function Home() {
  return (
    <div className='p-4'>
      <FileTrigger
        multiple
        fileLimitBytes={100 * 1024 * 1024}
        fileType='pdf'
        onAttach={(filelist) => console.log('attach', filelist)}
        onLimit={(file) => console.log('limit', file)}
      >
        <button>Attach files</button>
      </FileTrigger>
    </div>
  );
}
