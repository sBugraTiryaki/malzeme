<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentEventsWidget extends BaseWidget
{
    protected static ?string $heading = 'Son Etkinlikler';

    protected int | string | array $columnSpan = [
        'default' => 'full',
        'xl' => 2,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(Event::query()->latest('event_date')->limit(5))
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Etkinlik')
                    ->limit(40)
                    ->wrap(),
                Tables\Columns\TextColumn::make('event_date')
                    ->label('Tarih')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('location')
                    ->label('Konum')
                    ->limit(30)
                    ->wrap(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Durum')
                    ->boolean(),
            ])
            ->paginated(false)
            ->recordUrl(fn (Event $event) => route('filament.admin.resources.events.edit', ['record' => $event]));
    }
}
