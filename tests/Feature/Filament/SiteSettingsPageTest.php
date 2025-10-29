<?php

use App\Filament\Pages\SiteSettings;
use App\Models\Setting;
use App\Models\User;
use Filament\Facades\Filament;
use Livewire\Livewire;

beforeEach(function (): void {
    Filament::setCurrentPanel('admin');
});

it('allows authenticated users to view the site settings page', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $this->actingAs($user);

    $this->get('/admin/site-settings')->assertOk();
});

it('saves site configuration through the site settings form', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    $this->actingAs($user);

    $navigationItems = [
        ['key' => 'home', 'label' => 'Ana Sayfa', 'slug' => '/'],
        ['key' => 'about', 'label' => 'Kulübümüz', 'slug' => '/hakkimizda'],
        ['key' => 'events', 'label' => 'Etkinlik Takvimi', 'slug' => '/etkinlikler'],
        ['key' => 'team', 'label' => 'Ekibimiz', 'slug' => 'ekibimiz'],
        ['key' => 'news', 'label' => 'Duyurular', 'slug' => '/haberler'],
        ['key' => 'contact', 'label' => 'İletişim', 'slug' => 'mailto:iletisim@metalurji.test'],
    ];

    Livewire::test(SiteSettings::class)
        ->set('data.identity.site_name', 'Metalurji Test Kulübü')
        ->set('data.navigation.title', 'Metalurji Test Kulübü')
        ->set('data.navigation.items', $navigationItems)
        ->set('data.hero.title', 'Yeni Hero Başlığı')
        ->set('data.hero.subtitle', 'Yeni hero alt metni')
        ->set('data.hero.description', 'Deneyim paylaşımı ve iş birlikleri için bir araya geliyoruz.')
        ->set('data.footer.brand.title', 'Metalurji Test Kulübü')
        ->set('data.footer.brand.description', 'Metalurji ve malzeme bilimi odağında geleceği inşa ediyoruz.')
        ->set('data.footer.contact.email', 'iletisim@metalurji.test')
        ->set('data.footer.contact.phone', '+90 555 444 33 22')
        ->set('data.footer.contact.address', 'Test Kampüs, Malzeme Binası')
        ->set('data.footer.copyright', 'Metalurji Test Kulübü. Tüm hakları saklıdır.')
        ->call('save')
        ->assertHasNoErrors();

    expect(Setting::get('site_name'))->toBe('Metalurji Test Kulübü')
        ->and(Setting::get('navigation_title'))->toBe('Metalurji Test Kulübü')
        ->and(Setting::get('navigation_about_label'))->toBe('Kulübümüz')
        ->and(Setting::get('navigation_team_slug'))->toBe('/ekibimiz')
        ->and(Setting::get('hero_title'))->toBe('Yeni Hero Başlığı')
        ->and(Setting::get('footer_brand_description'))->toBe('Metalurji ve malzeme bilimi odağında geleceği inşa ediyoruz.')
        ->and(Setting::get('contact_email'))->toBe('iletisim@metalurji.test');
});
