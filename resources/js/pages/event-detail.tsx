import PublicLayout from '@/layouts/public-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface EventDetailProps {
    event: {
        id: number;
        title: string;
        description?: string | null;
        content?: string | null;
        location?: string | null;
        guest?: string | null;
        event_date: string;
        is_featured: boolean;
    };
}

export default function EventDetail({ event }: EventDetailProps) {
    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const formatTime = (dateString: string) =>
        new Date(dateString).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <PublicLayout title={`${event.title} - Metalurji Kulübü`}>
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-8 mx-auto h-60 max-w-4xl rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 right-1/5 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-white">
                        <Button asChild variant="outline" className="mb-8 border-white/30 bg-white/10 text-white hover:bg-white/20">
                            <Link href="/events">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Etkinliklere Geri Dön
                            </Link>
                        </Button>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(event.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(event.event_date)}</span>
                            </div>
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </div>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            {event.title}
                        </h1>

                        {event.guest && (
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                                Konuk: {event.guest}
                            </div>
                        )}

                        {event.is_featured && (
                            <Badge className="mt-4 bg-primary text-primary-foreground">Öne Çıkan</Badge>
                        )}

                        {event.description && (
                            <p className="mt-6 text-lg text-white/80">
                                {event.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="brand-surface rounded-3xl border border-white/15 p-8 shadow-xl backdrop-blur-lg">
                        {event.content ? (
                            <div
                                className="prose prose-lg prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: event.content }}
                            />
                        ) : (
                            <p className="text-white/70">
                                Bu etkinlik için detaylı içerik henüz eklenmemiş.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
