import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardProps {
    stats: {
        totalEvents: number;
        upcomingEvents: number;
        pastEvents: number;
        publishedNews: number;
        teamMembers: number;
        publishedPages: number;
    };
    recentEvents: Array<{
        id: number;
        title: string;
        event_date: string;
        location?: string | null;
        is_published: boolean;
    }>;
    recentNews: Array<{
        id: number;
        title: string;
        published_at?: string | null;
        is_published: boolean;
    }>;
    recentTeamMembers: Array<{
        id: number;
        name: string;
        role: string;
        type: 'advisor' | 'board';
        board_year?: string | null;
        is_published: boolean;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const StatCard = ({ label, value, accent }: { label: string; value: number; accent?: string }) => (
    <div className="brand-surface rounded-3xl border border-white/10 p-6 text-white shadow-lg">
        <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">{label}</span>
        <p className="mt-4 text-3xl font-semibold">{value}</p>
        {accent && <p className="mt-2 text-xs text-white/60">{accent}</p>}
    </div>
);

const formatDate = (value?: string | null) =>
    value
        ? new Date(value).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Tarih Belirsiz';

export default function Dashboard({ stats, recentEvents, recentNews, recentTeamMembers }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <StatCard label="Toplam Etkinlik" value={stats.totalEvents} accent="Yayınlanan tüm etkinlikler" />
                    <StatCard label="Yaklaşan Etkinlik" value={stats.upcomingEvents} accent="Önümüzdeki tarihli etkinlikler" />
                    <StatCard label="Geçmiş Etkinlik" value={stats.pastEvents} accent="Arşivde bulunan etkinlikler" />
                    <StatCard label="Yayınlanan Haber" value={stats.publishedNews} accent="Blog ve duyurular" />
                    <StatCard label="Ekip Üyesi" value={stats.teamMembers} accent="Danışman & yönetim kurulu" />
                    <StatCard label="Aktif Sayfa" value={stats.publishedPages} accent="Yayında olan statik sayfalar" />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="brand-surface rounded-3xl border border-white/10 p-6 text-white shadow-lg lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Yaklaşan & Geçmiş Etkinlikler</h2>
                            <Link href="/events" className="text-sm text-white/70 hover:text-white">
                                Tümünü Gör
                            </Link>
                        </div>
                        <ul className="mt-4 space-y-4">
                            {recentEvents.length === 0 ? (
                                <li className="text-sm text-white/60">Henüz etkinlik bulunmuyor.</li>
                            ) : (
                                recentEvents.map((event) => (
                                    <li key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-white/60">{formatDate(event.event_date)}</p>
                                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                                {event.location && (
                                                    <p className="text-sm text-white/70">{event.location}</p>
                                                )}
                                            </div>
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${event.is_published ? 'bg-green-500/20 text-green-200' : 'bg-white/10 text-white/70'}`}>
                                                {event.is_published ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="brand-surface flex flex-col gap-6 rounded-3xl border border-white/10 p-6 text-white shadow-lg">
                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Son Haberler</h2>
                                <Link href="/news" className="text-sm text-white/70 hover:text-white">
                                    Tümü
                                </Link>
                            </div>
                            <ul className="mt-4 space-y-3">
                                {recentNews.length === 0 ? (
                                    <li className="text-sm text-white/60">Henüz haber eklenmemiş.</li>
                                ) : (
                                    recentNews.map((news) => (
                                        <li key={news.id} className="rounded-2xl bg-white/5 p-3">
                                            <p className="text-sm text-white/60">{formatDate(news.published_at)}</p>
                                            <h3 className="text-base font-medium">{news.title}</h3>
                                            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${news.is_published ? 'bg-green-500/20 text-green-200' : 'bg-white/10 text-white/70'}`}>
                                                {news.is_published ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Yeni Ekip Katılımları</h2>
                                <Link href="/team" className="text-sm text-white/70 hover:text-white">
                                    Ekip
                                </Link>
                            </div>
                            <ul className="mt-4 space-y-3">
                                {recentTeamMembers.length === 0 ? (
                                    <li className="text-sm text-white/60">Henüz ekip üyesi eklenmemiş.</li>
                                ) : (
                                    recentTeamMembers.map((member) => (
                                        <li key={member.id} className="rounded-2xl bg-white/5 p-3">
                                            <h3 className="text-base font-medium">{member.name}</h3>
                                            <p className="text-sm text-white/70">{member.role}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
                                                <span className="rounded-full bg-white/10 px-2 py-0.5">
                                                    {member.type === 'advisor' ? 'Danışman' : 'Yönetim Kurulu'}
                                                </span>
                                                {member.board_year && (
                                                    <span className="rounded-full bg-white/10 px-2 py-0.5">
                                                        {member.board_year}
                                                    </span>
                                                )}
                                                <span className={`rounded-full px-2 py-0.5 ${member.is_published ? 'bg-green-500/20 text-green-200' : 'bg-white/10 text-white/70'}`}>
                                                    {member.is_published ? 'Yayında' : 'Taslak'}
                                                </span>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
