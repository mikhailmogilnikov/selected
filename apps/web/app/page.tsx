'use client';

import { useState } from 'react';

import { Trigger } from '../../../packages/trigger/src';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='p-4'>
      <Trigger
        asChild
        action={['hover', 'focus']}
        keyCode='Enter'
        onTrigger={() => setIsOpen(true)}
        onTriggerEnd={() => setIsOpen(false)}
      >
        <div className='flex flex-col gap-2'>
          <button>Click me</button>
          {isOpen && <div>Dropdown</div>}
        </div>
      </Trigger>
    </div>
  );
}
