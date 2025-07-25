import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-0 focus-visible:outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground bg-white border-none shadow-none hover:bg-white hover:border-none hover:shadow-none",
        destructive:
          "bg-destructive text-white border-none shadow-none hover:bg-destructive/90 hover:border-none hover:shadow-none focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-background border-none shadow-none hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 hover:border-none hover:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-none shadow-none hover:bg-secondary/80 hover:border-none hover:shadow-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border-none shadow-none hover:border-none hover:shadow-none",
        link:
          "text-primary underline-offset-4 hover:underline border-none shadow-none hover:border-none hover:shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
