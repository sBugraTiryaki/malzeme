import PublicLayout from '@/layouts/public-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
    description?: string;
    location?: string;
    guest?: string;
    event_date: string;
    is_featured: boolean;
}

interface EventsProps {
    upcomingEvents: Event[];
    pastEvents: Event[];
}

export default function Events({ upcomingEvents, pastEvents }: EventsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <PublicLayout title="Etkinlikler - Metalurji Kulübü">
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-8 mx-auto h-60 max-w-4xl rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 left-1/5 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <span className="mb-6 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            Etkinlik Takvimi
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Etkinliklerimiz
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-white/75 sm:text-xl">
                            Seminerler, atölyeler, fabrika gezileri ve daha fazlası. Kulübümüzün düzenlediği etkinliklerle bilgi ve deneyiminizi artırın.
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-white">
                        <h2 className="mb-4 text-3xl font-bold">Yaklaşan Etkinlikler</h2>
                        <p className="text-white/70">
                            Kaçırmak istemeyeceğiniz yaklaşan etkinliklerimiz
                        </p>
                    </div>

                    {upcomingEvents.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-white/70">Şu anda yaklaşan etkinlik bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <Card
                                    key={event.id}
                                    className="brand-surface flex flex-col border-white/10 shadow-xl backdrop-blur-lg"
                                >
                                    <CardHeader>
                                        {event.is_featured && (
                                            <div className="mb-2">
                                                <Badge className="bg-primary text-primary-foreground">
                                                    Öne Çıkan
                                                </Badge>
                                            </div>
                                        )}
                                        <CardTitle className="line-clamp-2 text-foreground">{event.title}</CardTitle>
                                        {event.description && (
                                            <CardDescription className="line-clamp-3 text-muted-foreground">
                                                {event.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="space-y-2 text-sm text-muted-foreground">
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
                                            {event.guest && (
                                                <p className="pt-2 text-sm text-white/80">
                                                    Konuk: {event.guest}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link href={`/events/${event.id}`}>
                                                Detayları Gör
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-white">
                            <h2 className="mb-4 text-3xl font-bold">Geçmiş Etkinlikler</h2>
                            <p className="text-white/70">
                                Geçmiş buluşmalarımızdan kayda değer anılar ve paylaşımlar
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pastEvents.map((event) => (
                                <Card
                                    key={`past-${event.id}`}
                                    className="brand-surface flex flex-col border-white/10 shadow-xl backdrop-blur-lg"
                                >
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 text-foreground">{event.title}</CardTitle>
                                        {event.description && (
                                            <CardDescription className="line-clamp-3 text-muted-foreground">
                                                {event.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="space-y-2 text-sm text-muted-foreground">
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
                                            {event.guest && (
                                                <p className="pt-2 text-sm text-white/80">
                                                    Konuk: {event.guest}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full" variant="secondary">
                                            <Link href={`/events/${event.id}`}>
                                                Etkinlik Detayı
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
