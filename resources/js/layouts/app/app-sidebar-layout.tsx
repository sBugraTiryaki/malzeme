import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden p-6 sm:p-8"
            >
                <div className="brand-surface flex min-h-full flex-col gap-6 rounded-3xl p-6 shadow-xl ring-1 ring-black/10 dark:ring-white/20">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <div className="flex-1">{children}</div>
                </div>
            </AppContent>
        </AppShell>
    );
}
