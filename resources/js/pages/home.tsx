import { Link } from '@inertiajs/react';
import { Calendar, Users, Newspaper, ArrowRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type HeroContent = {
    title: string;
    subtitle: string;
    description: string;
};

interface HomeProps {
    hero?: HeroContent;
}

const defaultHero: HeroContent = {
    title: 'Malzeme Biliminin Geleceğini Birlikte Şekillendiriyoruz',
    subtitle:
        'Üniversitemizin metalurji topluluğu; araştırmayı, inovasyonu ve dayanışmayı aynı potada eriten bir ekosistem.',
    description:
        'Öğrencileri bir araya getiriyor, sektör profesyonelleriyle buluşturuyor ve geleceğin malzeme mühendislerini hazırlıyoruz.',
};

export default function Home({ hero }: HomeProps) {
    const heroContent = {
        ...defaultHero,
        ...hero,
    };

    return (
        <PublicLayout title="Ana Sayfa - Metalurji Kulübü">
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-32 sm:py-40 md:py-48">
                <div className="brand-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
                <div
                    className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/15 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-32 right-16 h-72 w-72 rounded-full bg-primary/35 blur-3xl sm:h-96 sm:w-96"
                    aria-hidden="true"
                />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <div className="mb-8 flex justify-center">
                            <div className="brand-surface flex h-32 w-32 items-center justify-center rounded-3xl shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:h-40 sm:w-40">
                                <img
                                    src="/images/logo.svg"
                                    alt="Metalurji Kulübü Logo"
                                    className="h-24 w-24 sm:h-32 sm:w-32"
                                    onError={(e) => {
                                        e.currentTarget.src = '/images/logo.png';
                                    }}
                                />
                            </div>
                        </div>
                        <span className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/80 shadow-lg shadow-black/20 ring-1 ring-white/30">
                            Metalurji Kulübü
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-7xl">
                            {heroContent.title}
                        </h1>
                        <p className="mx-auto mb-4 max-w-3xl text-xl font-medium text-white/80 sm:text-2xl">
                            {heroContent.subtitle}
                        </p>
                        <p className="mx-auto mb-12 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl">
                            {heroContent.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-black shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                                asChild
                            >
                                <Link href="/about">
                                    Hakkımızda
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="border border-white/30 bg-white/10 text-white backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-white/15"
                                asChild
                            >
                                <Link href="/events">Etkinliklerimiz</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="absolute inset-x-0 top-0 mx-auto h-40 max-w-5xl rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                    <div className="relative z-10 mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Neler Yapıyoruz?
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-white/70">
                            Kulübümüzde öğrencilerimiz için birçok farklı etkinlik ve fırsat sunuyoruz.
                        </p>
                    </div>

                    <div className="relative z-10 grid gap-8 md:grid-cols-3">
                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader className="space-y-4">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-inner">
                                    <Calendar className="h-6 w-6" />
                                </span>
                                <CardTitle className="text-2xl font-semibold text-foreground">Etkinlikler</CardTitle>
                                <CardDescription className="text-base text-muted-foreground">
                                    Seminerler, atölyeler ve fabrika gezileri düzenliyoruz.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="p-0">
                                    <Link href="/events">
                                        Etkinlikleri İncele
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader className="space-y-4">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-inner">
                                    <Users className="h-6 w-6" />
                                </span>
                                <CardTitle className="text-2xl font-semibold text-foreground">Ekibimiz</CardTitle>
                                <CardDescription className="text-base text-muted-foreground">
                                    Alanında uzman öğrenci ve danışman kadromuz.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="p-0">
                                    <Link href="/team">
                                        Ekibi Tanı
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader className="space-y-4">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-inner">
                                    <Newspaper className="h-6 w-6" />
                                </span>
                                <CardTitle className="text-2xl font-semibold text-foreground">Haberler</CardTitle>
                                <CardDescription className="text-base text-muted-foreground">
                                    Kulüp haberleri ve sektörel gelişmeler.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="p-0">
                                    <Link href="/news">
                                        Haberleri Oku
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="brand-glass grid gap-10 rounded-3xl border border-white/15 px-8 py-12 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold">150+</div>
                            <div className="text-sm text-white/70">Aktif Üye</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold">50+</div>
                            <div className="text-sm text-white/70">Etkinlik</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold">20+</div>
                            <div className="text-sm text-white/70">Proje</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold">5+</div>
                            <div className="text-sm text-white/70">Yıllık Deneyim</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="brand-glass relative overflow-hidden rounded-3xl border border-white/15 px-10 py-16 text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
                        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
                        <div className="absolute inset-0 brand-noise opacity-20" aria-hidden="true" />

                        <div className="relative z-10 text-white">
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Bize Katılın!</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/75">
                                Metalurji ve malzeme bilimi ile ilgileniyorsanız, kulübümüze katılarak birçok fırsattan yararlanabilirsiniz.
                            </p>
                            <Button
                                size="lg"
                                className="bg-white text-black shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                                asChild
                            >
                                <Link href="/contact">İletişime Geç</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
