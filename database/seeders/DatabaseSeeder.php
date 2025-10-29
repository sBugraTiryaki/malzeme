<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\News;
use App\Models\Page;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@metalurji.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Example Admin',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Create team members
        TeamMember::factory()->create([
            'name' => 'Prof. Dr. Ahmet Yılmaz',
            'role' => 'Kulüp Danışmanı',
            'type' => 'advisor',
            'board_year' => null,
            'department' => 'Malzeme Bilimi ve Metalurji Mühendisliği',
            'email' => 'ahmet.yilmaz@universite.edu.tr',
            'order' => 0,
        ]);

        $boardSeeds = [
            '2025-2026' => [
                [
                    'name' => 'Melisa Orak',
                    'role' => 'Kulüp Başkanı',
                ],
                [
                    'name' => 'Hüseyin Emre Yürük',
                    'role' => 'Kulüp Başkan Yardımcısı',
                ],
                [
                    'name' => 'Metin Yıldız',
                    'role' => 'Kulüp Genel Koordinatörü',
                ],
                [
                    'name' => 'Gökay Kesik',
                    'role' => 'Kurumsal İletişim Koordinatörü',
                ],
                [
                    'name' => 'Dilara Gülen',
                    'role' => 'Kurumsal İletişim Koordinatörü',
                ],
                [
                    'name' => 'Arda Kiracı',
                    'role' => 'Etkinlik Koordinatörü',
                ],
                [
                    'name' => 'Batuhan Aksoy',
                    'role' => 'Araştırma Koordinatörü',
                ],
                [
                    'name' => 'Semih Nesimi Sarı',
                    'role' => 'Sponsorluk ve Sosyal Medya Koordinatörü',
                ],
            ],
            '2024-2025' => [
                [
                    'name' => 'Ayşe Demir',
                    'role' => 'Başkan',
                    'year' => '4. Sınıf',
                    'email' => 'ayse.demir@ogrenci.edu.tr',
                    'linkedin' => 'https://linkedin.com/in/aysedemir',
                ],
                [
                    'name' => 'Mehmet Kaya',
                    'role' => 'Başkan Yardımcısı',
                    'year' => '3. Sınıf',
                    'email' => 'mehmet.kaya@ogrenci.edu.tr',
                    'linkedin' => 'https://linkedin.com/in/mehmetkaya',
                ],
            ],
            '2023-2024' => [
                [
                    'name' => 'Zeynep Arslan',
                    'role' => 'Başkan',
                    'year' => '4. Sınıf',
                    'email' => 'zeynep.arslan@ogrenci.edu.tr',
                    'linkedin' => 'https://linkedin.com/in/zeyneparslan',
                ],
                [
                    'name' => 'Burak Güneş',
                    'role' => 'Başkan Yardımcısı',
                    'year' => '3. Sınıf',
                    'email' => 'burak.gunes@ogrenci.edu.tr',
                ],
                [
                    'name' => 'Elif Karaca',
                    'role' => 'Etkinlik Koordinatörü',
                    'year' => '2. Sınıf',
                    'email' => 'elif.karaca@ogrenci.edu.tr',
                ],
            ],
            '2022-2023' => [
                [
                    'name' => 'Kerem Öztürk',
                    'role' => 'Başkan',
                    'year' => '4. Sınıf',
                    'email' => 'kerem.ozturk@ogrenci.edu.tr',
                ],
                [
                    'name' => 'Seda Yıldız',
                    'role' => 'Başkan Yardımcısı',
                    'year' => '3. Sınıf',
                    'email' => 'seda.yildiz@ogrenci.edu.tr',
                ],
                [
                    'name' => 'Caner Aydın',
                    'role' => 'İletişim Sorumlusu',
                    'year' => '2. Sınıf',
                    'email' => 'caner.aydin@ogrenci.edu.tr',
                ],
            ],
        ];

        foreach ($boardSeeds as $boardYear => $members) {
            foreach ($members as $index => $memberData) {
                TeamMember::factory()->create(array_merge([
                    'type' => 'board',
                    'board_year' => $boardYear,
                    'order' => $index,
                    'is_published' => true,
                ], $memberData));
            }

            $additionalCount = max(0, 4 - count($members));

            for ($i = 0; $i < $additionalCount; $i++) {
                TeamMember::factory()->create([
                    'type' => 'board',
                    'board_year' => $boardYear,
                    'order' => count($members) + $i,
                    'is_published' => true,
                ]);
            }
        }

        // Create events
        Event::factory()->create([
            'title' => 'Metalurji Semineri: Gelecek Teknolojiler',
            'description' => 'Metalurji alanındaki son gelişmeler ve gelecek teknolojiler üzerine interaktif seminer.',
            'location' => 'Üniversite Konferans Salonu',
            'guest' => 'Prof. Dr. Selim Yıldırım - Malzeme Bilimi Uzmanı',
            'event_date' => now()->addDays(15),
            'is_featured' => true,
        ]);

        Event::create([
            'title' => 'TeaTalks: Orkun Günyeli ile Kariyer Sohbeti',
            'description' => 'TeaTalks serimizde TEI Metalurji ve Malzeme Mühendisi Orkun Günyeli ile samimi bir kariyer sohbeti gerçekleştirdik.',
            'content' => <<<HTML
<p><strong>TeaTalks Başlıyor!</strong></p>
<p>Mühendislik dünyasının içinden gelen tecrübeleri bir fincan çay eşliğinde dinlemeye hazır mısın? Bu buluşmada Orkun Günyeli kariyer yolculuğunu, karşılaştığı zorlukları ve öğrencilere tavsiyelerini paylaştı.</p>
<ul>
    <li><strong>Konuk:</strong> Orkun Günyeli – Metalurji ve Malzeme Mühendisi (TEI)</li>
    <li><strong>Tarih:</strong> 23 Ekim Perşembe</li>
    <li><strong>Yer:</strong> Ceren Özdemir Gençlik Merkezi – Demokrasi Sınıfı</li>
    <li><strong>Saat:</strong> 18.00</li>
</ul>
<p>Katılımcılar, havacılık sektöründe deneyim kazanmanın yolları, akademiden işe geçiş ve mühendislikte kariyer planlaması üzerine değerli bilgiler edindi.</p>
HTML,
            'location' => 'Ceren Özdemir Gençlik Merkezi - Demokrasi Sınıfı',
            'guest' => 'Orkun Günyeli - TEI Metalurji ve Malzeme Mühendisi',
            'event_date' => now()->setDate(2024, 10, 23)->setTime(18, 0),
            'image' => null,
            'is_published' => true,
            'is_featured' => false,
        ]);

        // Create news
        News::factory()->create([
            'title' => 'Yeni Dönem Yönetim Kurulu Seçimleri Tamamlandı',
            'slug' => 'yeni-donem-yonetim-kurulu-secimleri-tamamlandi',
            'excerpt' => 'Metalurji Kulübü 2024-2025 dönem yönetim kurulu seçimleri başarıyla gerçekleştirildi.',
            'is_featured' => true,
        ]);

        News::factory(12)->create();

        // Create pages
        Page::factory()->create([
            'slug' => 'about',
            'title' => 'Hakkımızda',
            'content' => null,
            'sections' => [
                'hero' => [
                    'badge' => 'Metalurji Kulübü',
                    'title' => 'Hakkımızda',
                    'subtitle' => 'Malzeme bilimi ve metalurji alanında tutkulu öğrencileri bir araya getiren, akademik ve sosyal gelişimi destekleyen bir topluluk.',
                ],
                'mission' => [
                    'title' => 'Misyonumuz',
                    'description' => 'Malzeme bilimi ve metalurji alanında öğrencilere teorik bilgilerini pratiğe dökebilecekleri, sektör profesyonelleri ile tanışabilecekleri ve deneyim kazanabilecekleri fırsatlar sunmak. Öğrencilerimizin akademik ve kişisel gelişimlerine katkıda bulunarak, alanında donanımlı bireyler yetiştirmek.',
                ],
                'vision' => [
                    'title' => 'Vizyonumuz',
                    'description' => 'Türkiye\'nin en aktif ve saygın malzeme bilimi kulüplerinden biri olmak. Öğrencilerimizin kariyer hedeflerine ulaşmalarında köprü görevi görmek ve sektöre nitelikli mezunlar kazandırmak. Ulusal ve uluslararası işbirlikleri ile öğrencilerimize global perspektif kazandırmak.',
                ],
                'story' => [
                    'title' => 'Hikayemiz',
                    'body' => '<p>Metalurji Kulübü, 2018 yılında malzeme bilimi ve metalurji bölümü öğrencilerinin bir araya gelerek kurduğu, öğrenci odaklı bir topluluktur. Kuruluşumuzdan bu yana 50\'den fazla etkinlik düzenledik, 20\'den fazla projeye imza attık ve 150\'den fazla öğrenciye ulaştık.</p><p>Fabrika gezileri, seminerler, atölyeler ve sosyal etkinliklerle öğrencilerimizin hem akademik hem de sosyal gelişimlerine katkıda bulunuyoruz. Sektörün önde gelen firmaları ile işbirlikleri yaparak, öğrencilerimize staj ve kariyer fırsatları sunuyoruz.</p><p>Kulübümüz, sadece akademik bir platform değil, aynı zamanda öğrencilerin dostluklar kurduğu, deneyim paylaştığı ve birlikte büyüdüğü bir ailedir.</p>',
                ],
                'values' => [
                    'title' => 'Değerlerimiz',
                    'subtitle' => 'Kulübümüzü şekillendiren temel değerler',
                    'items' => [
                        [
                            'title' => 'İşbirliği',
                            'description' => 'Birlikte çalışarak daha güçlü oluyoruz',
                        ],
                        [
                            'title' => 'Mükemmellik',
                            'description' => 'Her zaman daha iyisini hedefliyoruz',
                        ],
                        [
                            'title' => 'Yenilikçilik',
                            'description' => 'Yeni fikirlere ve yaklaşımlara açığız',
                        ],
                        [
                            'title' => 'Şeffaflık',
                            'description' => 'Açık ve dürüst iletişime inanıyoruz',
                        ],
                    ],
                ],
            ],
        ]);

        Page::factory()->create([
            'slug' => 'contact',
            'title' => 'İletişim',
            'content' => '<p><strong>E-posta:</strong> info@metalurjikulubu.com</p><p><strong>Tel:</strong> +90 XXX XXX XX XX</p><p><strong>Adres:</strong> Üniversite Kampüsü, Mühendislik Fakültesi</p>',
        ]);

        // Create settings
        collect([
            [
                'key' => 'site_name',
                'value' => 'Metalurji Kulübü',
                'type' => 'text',
                'group' => 'general',
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@metalurjikulubu.com',
                'type' => 'email',
                'group' => 'contact',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+90 XXX XXX XX XX',
                'type' => 'text',
                'group' => 'contact',
            ],
            [
                'key' => 'contact_address',
                'value' => 'Üniversite Kampüsü, Mühendislik Fakültesi',
                'type' => 'textarea',
                'group' => 'contact',
            ],
            [
                'key' => 'navigation_title',
                'value' => 'Metalurji Kulübü',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_home_label',
                'value' => 'Ana Sayfa',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_home_slug',
                'value' => '/',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_about_label',
                'value' => 'Hakkımızda',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_about_slug',
                'value' => '/about',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_events_label',
                'value' => 'Etkinlikler',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_events_slug',
                'value' => '/events',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_team_label',
                'value' => 'Ekibimiz',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_team_slug',
                'value' => '/team',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_news_label',
                'value' => 'Haberler',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_news_slug',
                'value' => '/news',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_contact_label',
                'value' => 'İletişim',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'navigation_contact_slug',
                'value' => '/contact',
                'type' => 'text',
                'group' => 'navigation',
            ],
            [
                'key' => 'current_board_year',
                'value' => '2025-2026',
                'type' => 'text',
                'group' => 'team',
            ],
            [
                'key' => 'hero_title',
                'value' => 'Malzeme Biliminin Geleceğini Birlikte Şekillendiriyoruz',
                'type' => 'text',
                'group' => 'hero',
            ],
            [
                'key' => 'hero_subtitle',
                'value' => 'Üniversitemizin metalurji topluluğu; araştırmayı, inovasyonu ve dayanışmayı aynı potada eriten bir ekosistem.',
                'type' => 'textarea',
                'group' => 'hero',
            ],
            [
                'key' => 'hero_description',
                'value' => 'Öğrencileri bir araya getiriyor, sektör profesyonelleriyle buluşturuyor ve geleceğin malzeme mühendislerini hazırlıyoruz.',
                'type' => 'textarea',
                'group' => 'hero',
            ],
            [
                'key' => 'footer_brand_title',
                'value' => 'Metalurji Kulübü',
                'type' => 'text',
                'group' => 'footer',
            ],
            [
                'key' => 'footer_brand_description',
                'value' => 'Üniversitemizde malzeme bilimi ve metalurji alanında öğrencileri bir araya getiren, bilgi ve deneyim paylaşımını teşvik eden bir topluluk.',
                'type' => 'textarea',
                'group' => 'footer',
            ],
            [
                'key' => 'footer_copyright_notice',
                'value' => 'Metalurji Kulübü. Tüm hakları saklıdır.',
                'type' => 'text',
                'group' => 'footer',
            ],
        ])->each(function (array $setting): void {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        });
    }
}
