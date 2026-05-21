import * as React from 'react';
import { cn } from '../utils';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of page content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

/**
 * Page - Page-level container
 */
const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, maxWidth = 'xl', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-full', maxWidthClasses[maxWidth], className)}
      {...props}
    />
  )
);

Page.displayName = 'Page';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-[var(--spacing-xl)]', className)}
      {...props}
    />
  )
);

PageHeader.displayName = 'PageHeader';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'text-3xl font-bold tracking-tight text-[var(--color-foreground)]',
        className
      )}
      {...props}
    />
  )
);

PageTitle.displayName = 'PageTitle';

export interface PageDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const PageDescription = React.forwardRef<HTMLParagraphElement, PageDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'mt-[var(--spacing-xs)] text-base text-[var(--color-foreground-muted)]',
        className
      )}
      {...props}
    />
  )
);

PageDescription.displayName = 'PageDescription';

export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageContent = React.forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-[var(--spacing-xl)]', className)}
      {...props}
    />
  )
);

PageContent.displayName = 'PageContent';

export { Page, PageHeader, PageTitle, PageDescription, PageContent };
