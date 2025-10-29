<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Etkinlik Bilgileri')
                    ->schema([
                        TextInput::make('title')
                            ->label('Başlık')
                            ->required()
                            ->columnSpanFull(),

                        Textarea::make('description')
                            ->label('Kısa Açıklama')
                            ->rows(3)
                            ->columnSpanFull(),

                        RichEditor::make('content')
                            ->label('Detaylı İçerik')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'link',
                                'bulletList',
                                'orderedList',
                                'h2',
                                'h3',
                            ]),

                        TextInput::make('location')
                            ->label('Konum'),

                        TextInput::make('guest')
                            ->label('Konuk Bilgisi')
                            ->helperText('Konuşmacı veya konuk adı ve unvanı'),

                        DateTimePicker::make('event_date')
                            ->label('Etkinlik Tarihi')
                            ->required()
                            ->native(false),

                        FileUpload::make('image')
                            ->label('Görsel')
                            ->image()
                            ->directory('events')
                            ->columnSpanFull(),

                        Toggle::make('is_published')
                            ->label('Yayında')
                            ->default(true),

                        Toggle::make('is_featured')
                            ->label('Öne Çıkan')
                            ->default(false),
                    ]),
            ]);
    }
}
