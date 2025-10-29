<?php

namespace App\Filament\Widgets;

use App\Models\News;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentNewsWidget extends BaseWidget
{
    protected static ?string $heading = 'Son Haberler';

    protected int | string | array $columnSpan = [
        'default' => 'full',
        'xl' => 1,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(
                News::query()
                    ->orderByDesc('published_at')
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Başlık')
                    ->limit(40)
                    ->wrap(),
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Yayın Tarihi')
                    ->dateTime('d M Y')
                    ->placeholder('Taslak'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Durum')
                    ->boolean(),
            ])
            ->paginated(false)
            ->recordUrl(fn (News $news) => route('filament.admin.resources.news.edit', ['record' => $news]));
    }
}
