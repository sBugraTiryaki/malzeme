import PublicLayout from '@/layouts/public-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Backend hazır olunca form gönderimi buraya eklenecek
        console.log('Form gönderildi:', formData);
        alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <PublicLayout title="İletişim - Metalurji Kulübü">
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-6 mx-auto h-56 max-w-4xl rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <span className="mb-6 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            Bize Ulaşın
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            İletişim
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-white/75 sm:text-xl">
                            Sorularınız, önerileriniz ve işbirlikleri için buradayız. Dilediğiniz kanaldan bize ulaşabilirsiniz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">İletişim Bilgileri</h2>
                                <p className="mb-8 text-muted-foreground">
                                    Bize ulaşmak için aşağıdaki iletişim kanallarını kullanabilir
                                    veya yanındaki formu doldurabilirsiniz.
                                </p>
                            </div>

                            <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>E-posta</CardTitle>
                                            <CardDescription>
                                                Her zaman ulaşabilirsiniz
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <a
                                        href="mailto:info@metalurjikulubu.com"
                                        className="text-primary hover:underline"
                                    >
                                        info@metalurjikulubu.com
                                    </a>
                                </CardContent>
                            </Card>

                            <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>Telefon</CardTitle>
                                            <CardDescription>
                                                Hafta içi 09:00 - 17:00
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <a
                                        href="tel:+905551234567"
                                        className="text-primary hover:underline"
                                    >
                                        +90 555 123 45 67
                                    </a>
                                </CardContent>
                            </Card>

                            <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>Adres</CardTitle>
                                            <CardDescription>
                                                Kulüp odasını ziyaret edin
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <address className="not-italic">
                                        Üniversite Kampüsü<br />
                                        Mühendislik Fakültesi<br />
                                        Metalurji Kulübü Odası<br />
                                        Ankara, Türkiye
                                    </address>
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <div>
                                <h3 className="mb-4 text-xl font-semibold">Sosyal Medya</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://instagram.com/metalurjikulubu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20"
                                        aria-label="Instagram"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/metalurjikulubu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20"
                                        aria-label="Twitter"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://linkedin.com/company/metalurjikulubu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="brand-surface border-white/10 shadow-2xl backdrop-blur-lg">
                            <CardHeader>
                                <CardTitle>Mesaj Gönderin</CardTitle>
                                <CardDescription>
                                    Formu doldurun, size en kısa sürede dönüş yapalım
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Ad Soyad *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Adınız ve soyadınız"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-posta *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="ornek@email.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Konu *</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder="Mesajınızın konusu"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mesajınız *</Label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            placeholder="Mesajınızı buraya yazın..."
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">
                                        <Send className="mr-2 h-4 w-4" />
                                        Gönder
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="bg-muted/50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                        <div className="flex h-full items-center justify-center">
                            <p className="text-muted-foreground">Harita buraya eklenecek</p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
