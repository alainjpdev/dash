'use client';

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { cn } from '@/lib/utils'; // Opcional: si usas clsx o una función `cn` para clases

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
}

const AspectRatio = ({ className, ...props }: AspectRatioProps) => {
  return (
    <AspectRatioPrimitive.Root
      {...props}
      className={cn(className)}
    />
  );
};

export default AspectRatio;