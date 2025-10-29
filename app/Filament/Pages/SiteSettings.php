<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions as ActionsComponent;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form as SchemaForm;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Str;

use function collect;
use function data_get;

class SiteSettings extends Page
{
    protected static string | \BackedEnum | null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string | \UnitEnum | null $navigationGroup = 'Site Yönetimi';

    protected static ?string $navigationLabel = 'Site Ayarları';

    protected static ?string $slug = 'site-settings';

    protected static ?string $title = 'Site Ayarları';

    /**
     * @var array<string, mixed> | null
     */
    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill($this->getFormDefaults());
    }

    public function defaultForm(Schema $schema): Schema
    {
        return $schema->statePath('data');
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Site Kimliği')
                    ->description('Logo ve üst menüde görünen temel bilgileri yönetin.')
                    ->schema([
                        TextInput::make('identity.site_name')
                            ->label('Site Adı')
                            ->required()
                            ->maxLength(150),
                        TextInput::make('navigation.title')
                            ->label('Üst Menü Başlığı')
                            ->helperText('Logonun yanında gösterilecek metin.')
                            ->required()
                            ->maxLength(150),
                    ])
                    ->columns(2),
                Section::make('Ana Sayfa Kahraman Alanı')
                    ->description('Anasayfadaki hero alanının metinlerini güncelleyin.')
                    ->schema([
                        TextInput::make('hero.title')
                            ->label('Hero Başlık')
                            ->required()
                            ->maxLength(150),
                        Textarea::make('hero.subtitle')
                            ->label('Öne Çıkan Cümle')
                            ->rows(3)
                            ->maxLength(300)
                            ->columnSpanFull(),
                        Textarea::make('hero.description')
                            ->label('Açıklama')
                            ->rows(4)
                            ->maxLength(450)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Navigasyon Menüsü')
                    ->description('Menüde yer alan bağlantıları düzenleyin.')
                    ->schema([
                        Repeater::make('navigation.items')
                            ->label('Menü Öğeleri')
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->schema([
                                Hidden::make('key'),
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('label')
                                            ->label('Görünen Ad')
                                            ->required()
                                            ->maxLength(50),
                                        TextInput::make('slug')
                                            ->label('Bağlantı')
                                            ->datalist(fn (): array => $this->navigationLinkSuggestionsWithState())
                                            ->required()
                                            ->maxLength(255)
                                            ->helperText('Site içi sayfa adresi yazın veya tam bir URL girin.'),
                                    ]),
                            ])
                            ->addable(false)
                            ->deletable(false)
                            ->reorderable(false)
                            ->columnSpanFull(),
                    ]),
                Section::make('Alt Bilgi')
                    ->description('Footer alanındaki marka ve iletişim bilgilerini güncelleyin.')
                    ->schema([
                        TextInput::make('footer.brand.title')
                            ->label('Alt Bilgi Başlığı')
                            ->required()
                            ->maxLength(150),
                        Textarea::make('footer.brand.description')
                            ->label('Alt Bilgi Açıklaması')
                            ->rows(3)
                            ->maxLength(400)
                            ->columnSpanFull(),
                        Grid::make(2)
                            ->schema([
                                TextInput::make('footer.contact.email')
                                    ->label('E-posta')
                                    ->email()
                                    ->required()
                                    ->maxLength(150),
                                TextInput::make('footer.contact.phone')
                                    ->label('Telefon')
                                    ->required()
                                    ->maxLength(50),
                            ]),
                        Textarea::make('footer.contact.address')
                            ->label('Adres')
                            ->rows(3)
                            ->maxLength(400)
                            ->columnSpanFull(),
                        TextInput::make('footer.copyright')
                            ->label('Telif Metni')
                            ->helperText('Metnin başına yıl otomatik eklenir.')
                            ->required()
                            ->maxLength(150),
                    ])
                    ->columns(2),
            ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema
            ->components([
                $this->getFormContentComponent(),
            ]);
    }

    protected function getFormContentComponent(): Component
    {
        return SchemaForm::make([EmbeddedSchema::make('form')])
            ->id('site-settings-form')
            ->livewireSubmitHandler('save')
            ->footer([
                ActionsComponent::make($this->getFormActions())
                    ->alignment($this->getFormActionsAlignment())
                    ->fullWidth(false)
                    ->sticky(false)
                    ->key('site-settings-form-actions'),
            ]);
    }

    /**
     * @return array<Action>
     */
    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Kaydet')
                ->submit('save')
                ->keyBindings(['mod+s']),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $siteName = trim((string) data_get($data, 'identity.site_name', 'Metalurji Kulübü'));
        $navigationTitle = trim((string) data_get($data, 'navigation.title', $siteName));

        if ($navigationTitle === '') {
            $navigationTitle = $siteName;
        }

        Setting::set('site_name', $siteName, 'text', 'general');
        Setting::set('navigation_title', $navigationTitle, 'text', 'navigation');

        foreach ($this->getNavigationItemsState($data) as $item) {
            $key = $item['key'];

            $label = trim((string) ($item['label'] ?? ''));
            if ($label === '') {
                $label = static::defaultNavigationItems()[$key]['label'] ?? $key;
            }

            $slug = $this->normalizeNavigationSlug($item['slug'] ?? null);

            Setting::set("navigation_{$key}_label", $label, 'text', 'navigation');
            Setting::set("navigation_{$key}_slug", $slug, 'text', 'navigation');
        }

        Setting::set('hero_title', trim((string) data_get($data, 'hero.title', '')), 'text', 'hero');
        Setting::set('hero_subtitle', trim((string) data_get($data, 'hero.subtitle', '')), 'textarea', 'hero');
        Setting::set('hero_description', trim((string) data_get($data, 'hero.description', '')), 'textarea', 'hero');

        Setting::set('footer_brand_title', trim((string) data_get($data, 'footer.brand.title', '')), 'text', 'footer');
        Setting::set('footer_brand_description', trim((string) data_get($data, 'footer.brand.description', '')), 'textarea', 'footer');
        Setting::set('contact_email', trim((string) data_get($data, 'footer.contact.email', '')), 'email', 'contact');
        Setting::set('contact_phone', trim((string) data_get($data, 'footer.contact.phone', '')), 'text', 'contact');
        Setting::set('contact_address', trim((string) data_get($data, 'footer.contact.address', '')), 'textarea', 'contact');
        Setting::set('footer_copyright_notice', trim((string) data_get($data, 'footer.copyright', '')), 'text', 'footer');

        $this->form->fill($this->getFormDefaults());

        Notification::make()
            ->success()
            ->title('Site ayarları güncellendi')
            ->send();
    }

    /**
     * @return array<string, mixed>
     */
    protected function getFormDefaults(): array
    {
        $navigationDefaults = collect(static::defaultNavigationItems())
            ->map(static function (array $defaults, string $key): array {
                return [
                    'key' => $key,
                    'label' => Setting::get("navigation_{$key}_label", $defaults['label']),
                    'slug' => Setting::get("navigation_{$key}_slug", $defaults['slug']),
                ];
            })
            ->values()
            ->all();

        $fallbackSiteName = Setting::get('site_name', 'Metalurji Kulübü');

        return [
            'identity' => [
                'site_name' => $fallbackSiteName,
            ],
            'navigation' => [
                'title' => Setting::get('navigation_title', $fallbackSiteName),
                'items' => $navigationDefaults,
            ],
            'hero' => [
                'title' => Setting::get('hero_title', 'Malzeme Biliminin Geleceğini Birlikte Şekillendiriyoruz'),
                'subtitle' => Setting::get('hero_subtitle', 'Üniversitemizin metalurji topluluğu; araştırmayı, inovasyonu ve dayanışmayı aynı potada eriten bir ekosistem.'),
                'description' => Setting::get('hero_description', 'Öğrencileri bir araya getiriyor, sektör profesyonelleriyle buluşturuyor ve geleceğin malzeme mühendislerini hazırlıyoruz.'),
            ],
            'footer' => [
                'brand' => [
                    'title' => Setting::get('footer_brand_title', $fallbackSiteName),
                    'description' => Setting::get('footer_brand_description', 'Üniversitemizde malzeme bilimi ve metalurji alanında öğrencileri bir araya getiren, bilgi ve deneyim paylaşımını teşvik eden bir topluluk.'),
                ],
                'contact' => [
                    'email' => Setting::get('contact_email', 'info@metalurjikulubu.com'),
                    'phone' => Setting::get('contact_phone', '+90 XXX XXX XX XX'),
                    'address' => Setting::get('contact_address', 'Üniversite Kampüsü'),
                ],
                'copyright' => Setting::get('footer_copyright_notice', 'Metalurji Kulübü. Tüm hakları saklıdır.'),
            ],
        ];
    }

    /**
     * @return array<string, array{label: string, slug: string}>
     */
    protected static function defaultNavigationItems(): array
    {
        return [
            'home' => ['label' => 'Ana Sayfa', 'slug' => '/'],
            'about' => ['label' => 'Hakkımızda', 'slug' => '/about'],
            'events' => ['label' => 'Etkinlikler', 'slug' => '/events'],
            'team' => ['label' => 'Ekibimiz', 'slug' => '/team'],
            'news' => ['label' => 'Haberler', 'slug' => '/news'],
            'contact' => ['label' => 'İletişim', 'slug' => '/contact'],
        ];
    }

    protected function navigationLinkSuggestionsWithState(): array
    {
        $suggestions = collect(static::defaultNavigationItems())
            ->pluck('slug')
            ->filter()
            ->values();

        foreach ($this->getNavigationItemsState($this->data ?? []) as $item) {
            $slug = trim((string) ($item['slug'] ?? ''));

            if ($slug === '') {
                continue;
            }

            $suggestions->push($slug);
        }

        return $suggestions
            ->unique()
            ->values()
            ->all();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<int, array{key: string, label: ?string, slug: ?string}>
     */
    protected function getNavigationItemsState(array $data): array
    {
        return collect(data_get($data, 'navigation.items', []))
            ->map(fn (array $item): array => [
                'key' => $item['key'] ?? '',
                'label' => $item['label'] ?? null,
                'slug' => $item['slug'] ?? null,
            ])
            ->filter(fn (array $item): bool => $item['key'] !== '')
            ->values()
            ->all();
    }

    protected function normalizeNavigationSlug(?string $slug): string
    {
        $slug = trim((string) $slug);

        if ($slug === '' || $slug === '/') {
            return '/';
        }

        if (Str::startsWith($slug, ['http://', 'https://', 'mailto:', 'tel:', '#'])) {
            return $slug;
        }

        return Str::start($slug, '/');
    }
}
