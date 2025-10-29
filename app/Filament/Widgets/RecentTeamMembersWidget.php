<?php

namespace App\Filament\Widgets;

use App\Models\TeamMember;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentTeamMembersWidget extends BaseWidget
{
    protected static ?string $heading = 'Yeni Ekip Üyeleri';

    protected int | string | array $columnSpan = [
        'default' => 'full',
        'xl' => 1,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(
                TeamMember::query()
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('İsim')
                    ->limit(30)
                    ->wrap(),
                Tables\Columns\TextColumn::make('role')
                    ->label('Rol')
                    ->limit(30)
                    ->wrap(),
                Tables\Columns\TextColumn::make('board_year')
                    ->label('Dönem')
                    ->placeholder('-'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Durum')
                    ->boolean(),
            ])
            ->paginated(false)
            ->recordUrl(fn (TeamMember $member) => route('filament.admin.resources.team-members.edit', ['record' => $member]));
    }
}
