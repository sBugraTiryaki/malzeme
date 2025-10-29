<?php

namespace App\Filament\Resources\TeamMembers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Kişi Bilgileri')
                    ->schema([
                        TextInput::make('name')
                            ->label('İsim')
                            ->required(),

                        TextInput::make('role')
                            ->label('Rol')
                            ->required(),

                        Select::make('type')
                            ->label('Tip')
                            ->options([
                                'advisor' => 'Danışman',
                                'board' => 'Yönetim Kurulu',
                            ])
                            ->default('board')
                            ->required(),

                        Select::make('board_year')
                            ->label('Yönetim Kurulu Dönemi')
                            ->options(static fn (): array => collect(range(2020, 2025))
                                ->mapWithKeys(
                                    static fn (int $year): array => [
                                        sprintf('%d-%d', $year, $year + 1) => sprintf('%d-%d', $year, $year + 1),
                                    ],
                                )
                                ->sortDesc()
                                ->all())
                            ->searchable()
                            ->visible(fn ($get): bool => $get('type') === 'board')
                            ->required(fn ($get): bool => $get('type') === 'board')
                            ->default(function (): string {
                                $currentYear = now()->year;

                                if (now()->month >= 8) {
                                    return sprintf('%d-%d', $currentYear, $currentYear + 1);
                                }

                                return sprintf('%d-%d', $currentYear - 1, $currentYear);
                            }),

                        TextInput::make('department')
                            ->label('Bölüm'),

                        TextInput::make('year')
                            ->label('Sınıf'),

                        TextInput::make('email')
                            ->label('E-posta')
                            ->email(),

                        TextInput::make('linkedin')
                            ->label('LinkedIn URL')
                            ->url(),

                        TextInput::make('github')
                            ->label('GitHub URL')
                            ->url(),

                        FileUpload::make('image')
                            ->label('Fotoğraf')
                            ->image()
                            ->directory('team'),

                        TextInput::make('order')
                            ->label('Sıra')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->helperText('Listeleme sırası (küçükten büyüğe)'),

                        Toggle::make('is_published')
                            ->label('Yayında')
                            ->default(true),
                    ]),
            ]);
    }
}
