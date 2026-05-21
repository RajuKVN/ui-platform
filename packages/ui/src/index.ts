/**
 * @ui-platform/ui
 * Enterprise-grade UI component library
 */

// Utilities
export { cn } from './utils/cn';
export type {
  AsProp,
  PolymorphicComponentProp,
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from './utils/polymorphic';

// Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input, inputVariants } from './components/input';
export type { InputProps } from './components/input';

export { Label, labelVariants } from './components/label';
export type { LabelProps } from './components/label';

export { Checkbox, checkboxVariants } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { RadioGroup, RadioGroupItem } from './components/radio-group';

export { Switch, switchVariants } from './components/switch';
export type { SwitchProps } from './components/switch';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/select';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/tooltip';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/dropdown-menu';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';

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
} from './components/toast';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/table';

export { Loading, Empty, ErrorState } from './components/states';
export type { LoadingProps, EmptyProps, ErrorStateProps } from './components/states';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';

export { Separator } from './components/separator';
export type { SeparatorProps } from './components/separator';

export { Avatar } from './components/avatar';
export type { AvatarProps } from './components/avatar';
