import * as React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials when image fails */
  fallback?: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'h-[1.5rem] w-[1.5rem] text-[0.625rem]',
  sm: 'h-[2rem] w-[2rem] text-xs',
  md: 'h-[2.5rem] w-[2.5rem] text-sm',
  lg: 'h-[3rem] w-[3rem] text-base',
  xl: 'h-[4rem] w-[4rem] text-lg',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const showImage = src && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          [
            'relative flex shrink-0 items-center justify-center overflow-hidden',
            'rounded-full',
            'bg-[var(--color-background-muted)]',
          ].join(' '),
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-medium text-[var(--color-foreground-muted)]">
            {fallback ?? alt?.charAt(0).toUpperCase() ?? '?'}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
