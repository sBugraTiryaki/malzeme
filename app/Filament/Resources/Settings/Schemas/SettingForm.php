<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Ayar Bilgileri')
                    ->schema([
                        TextInput::make('key')
                            ->label('Anahtar')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->helperText('Örnek: site_name, contact_email'),

                        Textarea::make('value')
                            ->label('Değer')
                            ->rows(3)
                            ->columnSpanFull(),

                        Select::make('type')
                            ->label('Tip')
                            ->options([
                                'text' => 'Metin',
                                'textarea' => 'Uzun Metin',
                                'number' => 'Sayı',
                                'boolean' => 'Evet/Hayır',
                                'url' => 'URL',
                                'email' => 'E-posta',
                            ])
                            ->required()
                            ->default('text'),

                        TextInput::make('group')
                            ->label('Grup')
                            ->required()
                            ->default('general')
                            ->helperText('Örnek: general, contact, social'),
                    ]),
            ]);
    }
}
