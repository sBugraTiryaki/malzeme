<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\DashboardStats;
use App\Filament\Widgets\RecentEventsWidget;
use App\Filament\Widgets\RecentNewsWidget;
use App\Filament\Widgets\RecentTeamMembersWidget;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
        return [
            DashboardStats::class,
            RecentEventsWidget::class,
            RecentNewsWidget::class,
            RecentTeamMembersWidget::class,
        ];
    }
}
