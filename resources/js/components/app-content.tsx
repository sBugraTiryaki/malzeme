import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({
    variant = 'header',
    children,
    className,
    ...props
}: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className={cn(
                'brand-surface mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-3xl p-6 shadow-lg ring-1 ring-black/5 dark:ring-white/10',
                className,
            )}
            {...props}
        >
            {children}
        </main>
    );
}
