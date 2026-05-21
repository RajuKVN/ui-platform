import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    aria-live="polite"
    aria-atomic="true"
    className={cn(
      [
        'fixed top-0 z-[1800] flex max-h-screen w-full flex-col-reverse p-[var(--spacing-lg)]',
        'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col',
        'md:max-w-[420px]',
      ].join(' '),
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between gap-[var(--spacing-gap-md)] overflow-hidden',
    'rounded-[var(--radius-lg)]',
    'border',
    'p-[var(--spacing-lg)]',
    'shadow-[var(--shadow-lg)]',
    'transition-all',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=move]:transition-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[swipe=end]:animate-out',
    'data-[state=closed]:fade-out-80',
    'data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=open]:sm:slide-in-from-bottom-full',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)]',
        success: 'border-[var(--color-success)] bg-[var(--color-success-muted)] text-[var(--color-success)]',
        warning: 'border-[var(--color-warning)] bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
        error: 'border-[var(--color-error)] bg-[var(--color-error-muted)] text-[var(--color-error)]',
        info: 'border-[var(--color-info)] bg-[var(--color-info-muted)] text-[var(--color-info)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
));

Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      [
        'inline-flex h-[var(--size-sm)] shrink-0 items-center justify-center',
        'rounded-[var(--radius-md)]',
        'border border-[var(--color-border)]',
        'bg-transparent px-[var(--spacing-inline-sm)]',
        'text-sm font-medium',
        'ring-offset-[var(--color-background)]',
        'transition-colors',
        'hover:bg-[var(--color-background-muted)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
      ].join(' '),
      className
    )}
    {...props}
  />
));

ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      [
        'absolute right-[var(--spacing-sm)] top-[var(--spacing-sm)]',
        'rounded-[var(--radius-md)]',
        'p-[var(--spacing-xs)]',
        'text-[var(--color-foreground)]/50',
        'opacity-0 transition-opacity',
        'hover:text-[var(--color-foreground)]',
        'focus:opacity-100 focus:outline-none focus:ring-2',
        'group-hover:opacity-100',
      ].join(' '),
      className
    )}
    toast-close=""
    {...props}
  >
    <XIcon className="h-[1rem] w-[1rem]" />
  </ToastPrimitive.Close>
));

ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));

ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));

ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  toastVariants,
};
