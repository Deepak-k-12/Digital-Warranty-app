import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const COMMON_VARIANTS = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
];

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
        outline: 'border bg-transparent shadow-xs',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: '',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      variantClassName: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'bg-green-600 text-white hover:bg-green-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
        info: 'bg-sky-500 text-white hover:bg-sky-600',
        light: 'bg-zinc-200 text-black hover:bg-zinc-300',
        dark: 'bg-zinc-800 text-white hover:bg-zinc-700'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9'
      }
    },
    compoundVariants: [
      ...COMMON_VARIANTS.map((variantClassName) => ({
        variant: 'outline',
        variantClassName,
        className: {
          primary: 'border bg-transparent border-primary text-primary hover:bg-primary/10',
          secondary: 'border bg-transparent border-secondary text-secondary hover:bg-secondary/10',
          success: 'border bg-transparent border-green-600 text-green-500 hover:bg-green-600/10',
          danger: 'border bg-transparent border-red-600 text-red-500 hover:bg-red-600/10',
          warning: 'border bg-transparent border-yellow-600 text-yellow-500 hover:bg-yellow-600/10',
          info: 'border bg-transparent border-sky-600 text-sky-500 hover:bg-sky-500/10',
          light: 'border bg-transparent border-zinc-200 text-zinc-700 hover:bg-zinc-200/10 dark:text-zinc-300',
          dark: 'border bg-transparent border-zinc-700 text-zinc-800 hover:bg-zinc-600/10 dark:text-zinc-400'
        }[variantClassName]
      })),
      ...COMMON_VARIANTS.map((variantClassName) => ({
        variant: 'ghost',
        variantClassName,
        className: {
          primary: 'bg-primary/10 text-primary hover:bg-primary/20',
          secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 dark:text-zinc-400',
          success: 'bg-green-600/10 text-green-400 hover:bg-green-600/20',
          danger: 'bg-red-600/10 text-red-400 hover:bg-red-600/20',
          warning: 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-500/20',
          info: 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20',
          light: 'bg-zinc-400/10 text-zinc-700 hover:bg-zinc-400/20 dark:text-zinc-300',
          dark: 'bg-zinc-950/10 text-zinc-900 hover:bg-zinc-700/20 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900/20'
        }[variantClassName]
      }))
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  // CHANGE: Destructure variantClassName here so it doesn't get passed to the DOM element
  variantClassName,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, variantClassName, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };