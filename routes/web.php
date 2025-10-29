<?php

use App\Models\Event;
use App\Models\News;
use App\Models\Page;
use App\Models\Setting;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('home', [
        'featuredEvents' => Event::where('is_published', true)
            ->where('is_featured', true)
            ->where('event_date', '>=', now())
            ->orderBy('event_date')
            ->limit(3)
            ->get(),
        'featuredNews' => News::where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get(),
        'hero' => [
            'title' => Setting::get(
                'hero_title',
                'Malzeme Biliminin Geleceğini Birlikte Şekillendiriyoruz',
            ),
            'subtitle' => Setting::get(
                'hero_subtitle',
                'Üniversitemizin metalurji topluluğu; araştırmayı, inovasyonu ve dayanışmayı aynı potada eriten bir ekosistem.',
            ),
            'description' => Setting::get(
                'hero_description',
                'Öğrencileri bir araya getiriyor, sektör profesyonelleriyle buluşturuyor ve geleceğin malzeme mühendislerini hazırlıyoruz.',
            ),
        ],
    ]);
})->name('home');

Route::get('/about', function () {
    $page = Page::where('slug', 'about')->where('is_published', true)->first();

    return Inertia::render('about', [
        'page' => $page,
    ]);
})->name('about');

Route::get('/events', function () {
    $upcomingEvents = Event::where('is_published', true)
        ->where('event_date', '>=', now())
        ->orderBy('event_date')
        ->get();

    $pastEvents = Event::where('is_published', true)
        ->where('event_date', '<', now())
        ->orderByDesc('event_date')
        ->get();

    return Inertia::render('events', [
        'upcomingEvents' => $upcomingEvents,
        'pastEvents' => $pastEvents,
    ]);
})->name('events');

Route::get('/events/{event}', function (Event $event) {
    abort_unless($event->is_published, 404);

    return Inertia::render('event-detail', [
        'event' => $event->loadMissing([]),
    ]);
})->name('events.show');

Route::get('/team', function () {
    $advisors = TeamMember::where('is_published', true)
        ->where('type', 'advisor')
        ->orderBy('order')
        ->get();

    $hasBoardYearColumn = Schema::hasColumn('team_members', 'board_year');

    $boardMembersQuery = TeamMember::where('is_published', true)
        ->where('type', 'board');

    if ($hasBoardYearColumn) {
        $boardMembersQuery->orderByDesc('board_year');
    }

    $boardMembers = $boardMembersQuery
        ->orderBy('order')
        ->get();

    $boardGroups = $boardMembers
        ->groupBy(function (TeamMember $member) use ($hasBoardYearColumn): string {
            if ($hasBoardYearColumn && $member->board_year) {
                return $member->board_year;
            }

            return 'Belirtilmemiş';
        })
        ->map(fn ($members, $year): array => [
            'year' => $year,
            'members' => $members->values()->all(),
        ])
        ->values();

    $currentBoardYear = $hasBoardYearColumn ? Setting::get('current_board_year') : null;

    if ((! $currentBoardYear || ! $hasBoardYearColumn) && $boardGroups->isNotEmpty()) {
        $currentBoardYear = $boardGroups->first()['year'];
    }

    $currentBoard = $currentBoardYear && $hasBoardYearColumn
        ? $boardGroups->firstWhere('year', $currentBoardYear)
        : null;

    $pastBoards = $boardGroups
        ->filter(fn (array $group): bool => $group['year'] !== ($currentBoardYear ?? $group['year']))
        ->values()
        ->all();

    return Inertia::render('team', [
        'advisors' => $advisors,
        'currentBoard' => $currentBoard,
        'pastBoards' => $pastBoards,
        'currentBoardYear' => $currentBoardYear,
    ]);
})->name('team');

Route::get('/news', function () {
    return Inertia::render('news', [
        'news' => News::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->get(),
    ]);
})->name('news');

Route::get('/news/{slug}', function (string $slug) {
    $news = News::where('slug', $slug)
        ->where('is_published', true)
        ->firstOrFail();

    return Inertia::render('news-detail', [
        'news' => $news,
    ]);
})->name('news.show');

Route::get('/contact', function () {
    $page = Page::where('slug', 'contact')->where('is_published', true)->first();

    return Inertia::render('contact', [
        'page' => $page,
        'contactEmail' => Setting::get('contact_email', 'info@metalurjikulubu.com'),
        'contactPhone' => Setting::get('contact_phone', '+90 XXX XXX XX XX'),
        'contactAddress' => Setting::get('contact_address', 'Üniversite Kampüsü'),
    ]);
})->name('contact');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $now = now();

        $totalEvents = Event::count();
        $upcomingEvents = Event::where('event_date', '>=', $now)->count();
        $pastEvents = Event::where('event_date', '<', $now)->count();
        $publishedNews = News::where('is_published', true)->count();
        $teamMembers = TeamMember::count();
        $publishedPages = Page::where('is_published', true)->count();

        $recentEvents = Event::orderByDesc('event_date')
            ->limit(5)
            ->get(['id', 'title', 'event_date', 'location', 'is_published']);

        $recentNews = News::orderByDesc('published_at')
            ->limit(5)
            ->get(['id', 'title', 'published_at', 'is_published']);

        $recentTeamMembers = TeamMember::orderByDesc('created_at')
            ->limit(5)
            ->get(['id', 'name', 'role', 'type', 'board_year', 'is_published']);

        return Inertia::render('dashboard', [
            'stats' => [
                'totalEvents' => $totalEvents,
                'upcomingEvents' => $upcomingEvents,
                'pastEvents' => $pastEvents,
                'publishedNews' => $publishedNews,
                'teamMembers' => $teamMembers,
                'publishedPages' => $publishedPages,
            ],
            'recentEvents' => $recentEvents,
            'recentNews' => $recentNews,
            'recentTeamMembers' => $recentTeamMembers,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
