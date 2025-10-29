<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $defaultNavigationItems = [
            ['key' => 'home', 'label' => 'Ana Sayfa', 'slug' => '/'],
            ['key' => 'about', 'label' => 'Hakkımızda', 'slug' => '/about'],
            ['key' => 'events', 'label' => 'Etkinlikler', 'slug' => '/events'],
            ['key' => 'team', 'label' => 'Ekibimiz', 'slug' => '/team'],
            ['key' => 'news', 'label' => 'Haberler', 'slug' => '/news'],
            ['key' => 'contact', 'label' => 'İletişim', 'slug' => '/contact'],
        ];

        $navigationItems = collect($defaultNavigationItems)
            ->map(function (array $item): array {
                $label = Setting::get("navigation_{$item['key']}_label", $item['label']);
                $slug = trim((string) Setting::get("navigation_{$item['key']}_slug", $item['slug']));

                if ($slug === '') {
                    $slug = $item['slug'];
                }

                if (Str::startsWith($slug, ['http://', 'https://', 'mailto:', 'tel:'])) {
                    $href = $slug;
                } else {
                    $href = $slug === '/' ? '/' : Str::start($slug, '/');
                }

                return [
                    'label' => $label,
                    'href' => $href,
                ];
            })
            ->toArray();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'navigation' => [
                'title' => Setting::get('navigation_title', 'Metalurji Kulübü'),
                'items' => $navigationItems,
            ],
            'footer' => [
                'brand' => [
                    'title' => Setting::get(
                        'footer_brand_title',
                        Setting::get('site_name', 'Metalurji Kulübü'),
                    ),
                    'description' => Setting::get(
                        'footer_brand_description',
                        'Üniversitemizde malzeme bilimi ve metalurji alanında öğrencileri bir araya getiren, bilgi ve deneyim paylaşımını teşvik eden bir topluluk.',
                    ),
                ],
                'contact' => [
                    'email' => Setting::get('contact_email', 'info@metalurjikulubu.com'),
                    'phone' => Setting::get('contact_phone', '+90 XXX XXX XX XX'),
                    'address' => Setting::get('contact_address', 'Üniversite Kampüsü'),
                ],
                'copyright' => Setting::get(
                    'footer_copyright_notice',
                    'Metalurji Kulübü. Tüm hakları saklıdır.',
                ),
            ],
        ];
    }
}
