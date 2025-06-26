'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value = [300, 2500], ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    value={value}
    {...props}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-indigo-500" />
    </SliderPrimitive.Track>
    {value.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-indigo-500 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = 'Slider';

export { Slider };