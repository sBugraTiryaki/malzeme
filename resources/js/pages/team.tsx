import PublicLayout from '@/layouts/public-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Github, X } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    type: 'advisor' | 'board';
    board_year?: string | null;
    department?: string;
    year?: string;
    email?: string;
    linkedin?: string;
    github?: string;
    image?: string | null;
}

interface BoardGroup {
    year: string;
    members: TeamMember[];
}

interface TeamProps {
    advisors: TeamMember[];
    currentBoard?: BoardGroup | null;
    pastBoards?: BoardGroup[];
    currentBoardYear?: string | null;
}

export default function Team({ advisors, currentBoard, pastBoards = [], currentBoardYear }: TeamProps) {
    const [selectedBoard, setSelectedBoard] = useState<BoardGroup | null>(null);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const renderBoardMemberCard = (member: TeamMember) => (
        <Card key={member.id} className="brand-surface border-white/10 shadow-xl backdrop-blur-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center text-foreground">
                    <Avatar className="mb-4 h-20 w-20 ring-4 ring-primary/15">
                        <AvatarImage src={member.image || undefined} />
                        <AvatarFallback>
                            {getInitials(member.name)}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="mb-1 text-lg font-semibold">
                        {member.name}
                    </h3>
                    <Badge className="mb-1 bg-primary/10 text-primary" variant="secondary">
                        {member.role}
                    </Badge>
                    <p className="mb-2 text-xs text-muted-foreground">
                        {member.year}
                    </p>
                    <div className="flex gap-2">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="rounded-full p-2 hover:bg-primary/10"
                                aria-label="Email"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                        )}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full p-2 hover:bg-primary/10"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                        )}
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full p-2 hover:bg-primary/10"
                                aria-label="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <PublicLayout title="Ekibimiz - Metalurji Kulübü">
            {/* Hero Section */}
            <section className="brand-aurora relative isolate overflow-hidden py-24 sm:py-32">
                <div className="brand-noise absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="absolute inset-x-0 top-8 mx-auto h-60 max-w-4xl rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-20 right-1/5 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <span className="mb-6 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            Kadromuz
                        </span>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Ekibimiz
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg text-white/75 sm:text-xl">
                            Kulübümüzü yöneten deneyimli danışmanlarımız ve dinamik yönetim kurulumuz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Advisors Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-white">
                        <h2 className="mb-4 text-3xl font-bold">Danışmanlarımız</h2>
                        <p className="text-white/70">
                            Bize yol gösteren değerli hocalarımız
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {advisors.map((advisor) => (
                            <Card key={advisor.id} className="brand-surface border-white/10 shadow-xl backdrop-blur-lg">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center text-foreground">
                                        <Avatar className="mb-4 h-24 w-24 ring-4 ring-primary/20">
                                            <AvatarImage src={advisor.image || undefined} />
                                            <AvatarFallback className="text-lg">
                                                {getInitials(advisor.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h3 className="mb-1 text-xl font-semibold">
                                            {advisor.name}
                                        </h3>
                                        <Badge className="mb-2 bg-primary/10 text-primary" variant="secondary">
                                            {advisor.role}
                                        </Badge>
                                        <p className="mb-4 text-sm text-muted-foreground">
                                            {advisor.department}
                                        </p>
                                        {advisor.email && (
                                            <div className="flex gap-2">
                                                <a
                                                    href={`mailto:${advisor.email}`}
                                                    className="rounded-full p-2 hover:bg-primary/10"
                                                    aria-label="Email"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Current Board Section */}
            {currentBoard && (
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-white">
                            <h2 className="mb-4 text-3xl font-bold">
                                {currentBoardYear ?? currentBoard.year} Yönetim Kurulu
                            </h2>
                            <p className="text-white/70">
                                Aktif dönemde görev alan yönetim kurulu üyelerimiz
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {currentBoard.members.map((member) => renderBoardMemberCard(member))}
                        </div>
                    </div>
                </section>
            )}

            {/* Past Boards Section */}
            {pastBoards.length > 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-white">
                            <h2 className="mb-4 text-3xl font-bold">Geçmiş Yönetim Kurulları</h2>
                            <p className="text-white/70">
                                Önceki dönemlerde görev alan yönetim kurulu üyelerimizin arşivi
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {pastBoards.map((board) => (
                                <Card
                                    key={board.year}
                                    className="brand-surface flex h-full flex-col border-white/10 shadow-xl backdrop-blur-lg"
                                >
                                    <CardContent className="flex h-full flex-col justify-between gap-4 pt-6">
                                        <div className="text-white">
                                            <h3 className="text-2xl font-semibold">{board.year} Dönemi</h3>
                                            <p className="mt-2 text-sm text-white/70">
                                                {board.members.length} yönetim kurulu üyesi
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedBoard(board)}
                                            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                                        >
                                            Dönemi Görüntüle
                                        </button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {selectedBoard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedBoard(null)}
                        aria-hidden="true"
                    />
                    <div className="brand-glass relative z-10 max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/20 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
                        <div className="mb-6 flex items-start justify-between text-white">
                            <div>
                                <h3 className="text-3xl font-bold">{selectedBoard.year} Yönetim Kurulu</h3>
                                <p className="mt-2 text-sm text-white/70">
                                    {selectedBoard.members.length} üye
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedBoard(null)}
                                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                                aria-label="Kapat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {selectedBoard.members.map((member) => renderBoardMemberCard(member))}
                        </div>
                    </div>
                </div>
            )}

            {/* Join CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="brand-glass relative overflow-hidden rounded-3xl border border-white/15 px-10 py-16 text-center text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                        <div className="absolute -right-24 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
                        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
                        <div className="absolute inset-0 brand-noise opacity-20" aria-hidden="true" />

                        <div className="relative z-10">
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ekibimize Katılmak İster misin?</h2>
                            <p className="mx-auto max-w-2xl text-lg text-white/75">
                                Yeni dönem yönetim kurulu seçimlerimiz her yıl ekim ayında yapılır.
                                Kulübümüze üye olarak etkinliklerimize katılabilir ve topluluğumuzun
                                bir parçası olabilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
