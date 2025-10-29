import PublicLayout from '@/layouts/public-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Award, Users } from 'lucide-react';

interface AboutPageProps {
    page?: {
        title: string;
        sections?: {
            hero?: {
                badge?: string;
                title?: string;
                subtitle?: string;
            };
            mission?: {
                title?: string;
                description?: string;
            };
            vision?: {
                title?: string;
                description?: string;
            };
            story?: {
                title?: string;
                body?: string;
            };
            values?: {
                title?: string;
                subtitle?: string;
                items?: Array<{
                    title?: string;
                    description?: string;
                }>;
            };
        } | null;
    } | null;
}

const defaultSections = {
    hero: {
        badge: 'Metalurji Kulübü',
        title: 'Hakkımızda',
        subtitle:
            'Malzeme bilimi ve metalurji alanında tutkulu öğrencileri bir araya getiren, akademik ve sosyal gelişimi destekleyen bir topluluk.',
    },
    mission: {
        title: 'Misyonumuz',
        description:
            'Malzeme bilimi ve metalurji alanında öğrencilere teorik bilgilerini pratiğe dökebilecekleri, sektör profesyonelleri ile tanışabilecekleri ve deneyim kazanabilecekleri fırsatlar sunmak. Öğrencilerimizin akademik ve kişisel gelişimlerine katkıda bulunarak, alanında donanımlı bireyler yetiştirmek.',
    },
    vision: {
        title: 'Vizyonumuz',
        description:
            "Türkiye'nin en aktif ve saygın malzeme bilimi kulüplerinden biri olmak. Öğrencilerimizin kariyer hedeflerine ulaşmalarında köprü görevi görmek ve sektöre nitelikli mezunlar kazandırmak. Ulusal ve uluslararası işbirlikleri ile öğrencilerimize global perspektif kazandırmak.",
    },
    story: {
        title: 'Hikayemiz',
        body: '<p>Metalurji Kulübü, 2018 yılında malzeme bilimi ve metalurji bölümü öğrencilerinin bir araya gelerek kurduğu, öğrenci odaklı bir topluluktur. Kuruluşumuzdan bu yana 50\'den fazla etkinlik düzenledik, 20\'den fazla projeye imza attık ve 150\'den fazla öğrenciye ulaştık.</p><p>Fabrika gezileri, seminerler, atölyeler ve sosyal etkinliklerle öğrencilerimizin hem akademik hem de sosyal gelişimlerine katkıda bulunuyoruz. Sektörün önde gelen firmaları ile işbirlikleri yaparak, öğrencilerimize staj ve kariyer fırsatları sunuyoruz.</p><p>Kulübümüz, sadece akademik bir platform değil, aynı zamanda öğrencilerin dostluklar kurduğu, deneyim paylaştığı ve birlikte büyüdüğü bir ailedir.</p>',
    },
    values: {
        title: 'Değerlerimiz',
        subtitle: 'Kulübümüzü şekillendiren temel değerler',
        items: [
            {
                title: 'İşbirliği',
                description: 'Birlikte çalışarak daha güçlü oluyoruz',
            },
            {
                title: 'Mükemmellik',
                description: 'Her zaman daha iyisini hedefliyoruz',
            },
            {
                title: 'Yenilikçilik',
                description: 'Yeni fikirlere ve yaklaşımlara açığız',
            },
            {
                title: 'Şeffaflık',
                description: 'Açık ve dürüst iletişime inanıyoruz',
            },
        ],
    },
};

export default function About({ page }: AboutPageProps) {
    const customValues = page?.sections?.values?.items;
    const valuesItems = Array.isArray(customValues) && customValues.length > 0 ? customValues : defaultSections.values.items;

    const sections = {
        hero: { ...defaultSections.hero, ...(page?.sections?.hero ?? {}) },
        mission: { ...defaultSections.mission, ...(page?.sections?.mission ?? {}) },
        vision: { ...defaultSections.vision, ...(page?.sections?.vision ?? {}) },
        story: { ...defaultSections.story, ...(page?.sections?.story ?? {}) },
        values: {
            ...defaultSections.values,
            ...(page?.sections?.values ?? {}),
            items: valuesItems,
        },
    };

    return (
        <PublicLayout title={`${sections.hero.title} - Metalurji Kulübü`}>
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-10 mx-auto h-64 max-w-4xl rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
                <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <span className="mb-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            {sections.hero.badge}
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            {sections.hero.title}
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-white/75 sm:text-xl">
                            {sections.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardContent className="pt-6">
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">{sections.mission.title}</h2>
                                </div>
                                <p className="text-muted-foreground">{sections.mission.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardContent className="pt-6">
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                        <Eye className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">{sections.vision.title}</h2>
                                </div>
                                <p className="text-muted-foreground">{sections.vision.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="brand-glass mx-auto max-w-3xl rounded-3xl border border-white/15 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                        <h2 className="mb-8 text-3xl font-bold text-white">{sections.story.title}</h2>
                        <div
                            className="prose prose-lg text-white/80 dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: sections.story.body }}
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="absolute inset-x-0 top-1 h-32 max-w-4xl rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                    <div className="relative z-10 mb-12 text-center text-white">
                        <h2 className="mb-4 text-3xl font-bold">{sections.values.title}</h2>
                        <p className="mx-auto max-w-2xl text-lg text-white/70">
                            {sections.values.subtitle}
                        </p>
                    </div>

                    <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {sections.values.items.map((item, index) => {
                            const icons = [Users, Award, Target, Eye];
                            const Icon = icons[index % icons.length] ?? Users;

                            return (
                                <div className="text-center" key={`${item.title}-${index}`}>
                                    <div className="mb-4 flex justify-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="text-sm text-white/70">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
