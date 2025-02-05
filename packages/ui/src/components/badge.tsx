import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        success:
          "text-green-600 bg-[#F3FFF3] border-[#A9FFA9] dark:bg-[#0E1F0E] dark:border-[#1F7F1F]",
        warning:
          "text-orange-600 bg-[#FFF8F3] border-[#FFCFA9] dark:bg-[#2A1A0E] dark:border-[#BF651F]",
        destructive:
          "text-destructive bg-[#FFF3F3] border-[#FFA9A9] dark:bg-[#1F0E0E] dark:border-[#7F1F1F]",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
