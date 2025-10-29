import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';

interface PublicLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function PublicLayout({
    children,
    title = 'Metalurji Kulübü',
}: PublicLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const fallbackNavigation = [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hakkımızda', href: '/about' },
        { label: 'Etkinlikler', href: '/events' },
        { label: 'Ekibimiz', href: '/team' },
        { label: 'Haberler', href: '/news' },
        { label: 'İletişim', href: '/contact' },
    ];

    const { navigation, footer } = usePage<SharedData>().props;

    const navigationTitle =
        (navigation && typeof navigation.title === 'string' && navigation.title.trim().length > 0
            ? navigation.title
            : 'Metalurji Kulübü');

    const navigationItems =
        navigation && Array.isArray(navigation.items) && navigation.items.length > 0
            ? navigation.items
            : fallbackNavigation;

    const fallbackFooter = {
        brand: {
            title: 'Metalurji Kulübü',
            description:
                'Üniversitemizde malzeme bilimi ve metalurji alanında öğrencileri bir araya getiren, bilgi ve deneyim paylaşımını teşvik eden bir topluluk.',
        },
        contact: {
            email: 'info@metalurjikulubu.com',
            phone: '+90 XXX XXX XX XX',
            address: 'Üniversite Kampüsü',
        },
        copyright: 'Metalurji Kulübü. Tüm hakları saklıdır.',
    };

    const footerData = {
        brand: {
            title:
                footer?.brand?.title && footer.brand.title.trim().length > 0
                    ? footer.brand.title
                    : fallbackFooter.brand.title,
            description:
                footer?.brand?.description && footer.brand.description.trim().length > 0
                    ? footer.brand.description
                    : fallbackFooter.brand.description,
        },
        contact: {
            email:
                footer?.contact?.email && footer.contact.email.trim().length > 0
                    ? footer.contact.email
                    : fallbackFooter.contact.email,
            phone:
                footer?.contact?.phone && footer.contact.phone.trim().length > 0
                    ? footer.contact.phone
                    : fallbackFooter.contact.phone,
            address:
                footer?.contact?.address && footer.contact.address.trim().length > 0
                    ? footer.contact.address
                    : fallbackFooter.contact.address,
        },
        copyright:
            footer?.copyright && footer.copyright.trim().length > 0
                ? footer.copyright
                : fallbackFooter.copyright,
    };

    const footerContactItems: Array<{ label: string; value: string; href?: string }> = [];

    if (footerData.contact.email) {
        footerContactItems.push({
            label: 'Email',
            value: footerData.contact.email,
            href: `mailto:${footerData.contact.email}`,
        });
    }

    if (footerData.contact.phone) {
        const phoneDigits = footerData.contact.phone.replace(/[^+\d]/g, '');

        footerContactItems.push({
            label: 'Tel',
            value: footerData.contact.phone,
            href: phoneDigits.length > 0 ? `tel:${phoneDigits}` : undefined,
        });
    }

    if (footerData.contact.address) {
        footerContactItems.push({
            label: 'Adres',
            value: footerData.contact.address,
        });
    }

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-brand-gradient">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-gradient-soft backdrop-brand text-white">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src="/images/logo.svg"
                                        alt="Metalurji Kulübü Logo"
                                        className="h-10 w-10"
                                        onError={(e) => {
                                            e.currentTarget.src = '/images/logo.png';
                                        }}
                                    />
                                    <span className="text-xl font-bold text-white">
                                        {navigationTitle}
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={`${item.label}-${item.href}`}
                                            href={item.href}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/10"
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {mobileMenuOpen && (
                            <div className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={`${item.label}-${item.href}-mobile`}
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Main Content */}
                <main>{children}</main>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-black/65 text-white/80 backdrop-brand">
                    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* About Column */}
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <img
                                        src="/images/logo.svg"
                                        alt="Metalurji Kulübü Logo"
                                        className="h-8 w-8"
                                        onError={(e) => {
                                            e.currentTarget.src = '/images/logo.png';
                                        }}
                                    />
                                    <h3 className="text-lg font-semibold">
                                        {footerData.brand.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-white/70">
                                    {footerData.brand.description}
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Hızlı Linkler
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {navigationItems.map((item) => (
                                        <li key={`${item.label}-${item.href}-footer`}>
                                            <Link
                                                href={item.href}
                                                className="text-white/70 hover:text-white"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    İletişim
                                </h3>
                                <ul className="space-y-2 text-sm text-white/70">
                                    {footerContactItems.map((item) => (
                                        <li key={item.label}>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-white/70 transition hover:text-white"
                                                >
                                                    {item.label}: {item.value}
                                                </a>
                                            ) : (
                                                <span>
                                                    {item.label}: {item.value}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
                            <p>
                                © {new Date().getFullYear()} {footerData.copyright}
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
