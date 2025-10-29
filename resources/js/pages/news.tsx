import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface News {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    author?: string;
    published_at: string;
    is_featured: boolean;
}

interface NewsProps {
    news: News[];
}

export default function News({ news }: NewsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Öne çıkan ve diğer haberler
    const featuredNews = news.find((n) => n.is_featured) || news[0];
    const otherNews = news.filter((n) => n.id !== featuredNews?.id);

    return (
        <PublicLayout title="Haberler - Metalurji Kulübü">
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-8 mx-auto h-60 max-w-4xl rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <span className="mb-6 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            Haber Akışı
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Haberler & Blog
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-white/75 sm:text-xl">
                            Kulüp haberlerimiz, etkinlik duyuruları ve malzeme bilimi dünyasından ilham verici içerikler.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured News */}
            {featuredNews && (
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="brand-surface overflow-hidden border-white/10 shadow-2xl backdrop-blur-lg">
                            <div className="grid md:grid-cols-2">
                                <div className="brand-aurora relative aspect-video md:aspect-auto">
                                    <div className="absolute inset-0 brand-noise opacity-25" aria-hidden="true" />
                                    <div className="relative z-10 flex h-full items-center justify-center text-white/70">
                                        Görsel
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-8">
                                    <Badge className="mb-4 w-fit bg-primary text-primary-foreground">
                                        Öne Çıkan
                                    </Badge>
                                    <h2 className="mb-4 text-3xl font-bold">{featuredNews.title}</h2>
                                    {featuredNews.excerpt && (
                                        <p className="mb-6 text-muted-foreground">{featuredNews.excerpt}</p>
                                    )}
                                    <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        {featuredNews.author && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>{featuredNews.author}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(featuredNews.published_at)}</span>
                                        </div>
                                    </div>
                                    <Button asChild>
                                        <Link href={`/news/${featuredNews.slug}`}>
                                            Devamını Oku
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* News Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-white">
                        <h2 className="mb-4 text-3xl font-bold">Son Haberler</h2>
                        <p className="text-white/70">
                            Kulübümüzden ve malzeme bilimi dünyasından haberler
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {otherNews.map((newsItem) => (
                            <Card
                                key={newsItem.id}
                                className="brand-surface flex flex-col border-white/10 shadow-xl backdrop-blur-lg"
                            >
                                <CardHeader>
                                    <CardTitle className="line-clamp-2 text-foreground">{newsItem.title}</CardTitle>
                                    {newsItem.excerpt && (
                                        <CardDescription className="line-clamp-3 text-muted-foreground">
                                            {newsItem.excerpt}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        {newsItem.author && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>{newsItem.author}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(newsItem.published_at)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/news/${newsItem.slug}`}>
                                            Devamını Oku
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
