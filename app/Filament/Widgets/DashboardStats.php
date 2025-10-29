<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\Setting;
use App\Models\News;
use App\Models\Page;
use App\Models\TeamMember;
use Filament\Support\Enums\IconPosition;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $now = now();

        $totalEvents = Event::count();
        $upcomingEvents = Event::where('event_date', '>=', $now)->count();
        $publishedNews = News::where('is_published', true)->count();
        $teamMembers = TeamMember::count();
        $currentBoardYear = Setting::get('current_board_year');

        $currentBoard = TeamMember::where('type', 'board')
            ->when($currentBoardYear, fn ($query): mixed => $query->where('board_year', $currentBoardYear))
            ->count();
        $publishedPages = Page::where('is_published', true)->count();

        return [
            Stat::make('Toplam Etkinlik', $totalEvents)
                ->description(__('Yaklaşan :count etkinlik', ['count' => $upcomingEvents]))
                ->descriptionIcon('heroicon-m-calendar-days', IconPosition::Before)
                ->color('primary'),

            Stat::make('Yayınlanan Haber', $publishedNews)
                ->description('Blog & duyurular')
                ->descriptionIcon('heroicon-m-megaphone', IconPosition::Before)
                ->color('success'),

            Stat::make('Ekip Üyesi', $teamMembers)
                ->description(__('Aktif kurul üyesi: :count', ['count' => $currentBoard]))
                ->descriptionIcon('heroicon-m-user-group', IconPosition::Before)
                ->color('warning'),

            Stat::make('Yayındaki Sayfa', $publishedPages)
                ->description('Statik içerik sayısı')
                ->descriptionIcon('heroicon-m-document-text', IconPosition::Before)
                ->color('info'),
        ];
    }
}
