<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Str;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Sayfa Bilgileri')
                    ->schema([
                        TextInput::make('title')
                            ->label('Başlık')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->helperText('URL için kullanılacak benzersiz isim'),

                        RichEditor::make('content')
                            ->label('İçerik')
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

                        Toggle::make('is_published')
                            ->label('Yayında')
                            ->default(true),
                    ]),
                Section::make('Hakkımızda İçeriği')
                    ->visible(fn ($get): bool => $get('slug') === 'about')
                    ->schema([
                        TextInput::make('sections.hero.badge')
                            ->label('Hero Rozet')
                            ->default('Metalurji Kulübü'),
                        TextInput::make('sections.hero.title')
                            ->label('Hero Başlık')
                            ->default('Hakkımızda')
                            ->required(),
                        Textarea::make('sections.hero.subtitle')
                            ->label('Hero Alt Metin')
                            ->rows(3)
                            ->columnSpanFull(),

                        TextInput::make('sections.mission.title')
                            ->label('Misyon Başlığı')
                            ->default('Misyonumuz')
                            ->required(),
                        Textarea::make('sections.mission.description')
                            ->label('Misyon Metni')
                            ->rows(4)
                            ->columnSpanFull(),

                        TextInput::make('sections.vision.title')
                            ->label('Vizyon Başlığı')
                            ->default('Vizyonumuz')
                            ->required(),
                        Textarea::make('sections.vision.description')
                            ->label('Vizyon Metni')
                            ->rows(4)
                            ->columnSpanFull(),

                        TextInput::make('sections.story.title')
                            ->label('Hikaye Başlığı')
                            ->default('Hikayemiz'),
                        RichEditor::make('sections.story.body')
                            ->label('Hikaye Metni')
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

                        TextInput::make('sections.values.title')
                            ->label('Değerler Başlığı')
                            ->default('Değerlerimiz'),
                        Textarea::make('sections.values.subtitle')
                            ->label('Değerler Alt Metni')
                            ->rows(3),
                        Repeater::make('sections.values.items')
                            ->label('Değer Kartları')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Başlık')
                                    ->required(),
                                Textarea::make('description')
                                    ->label('Açıklama')
                                    ->rows(2)
                                    ->required(),
                            ])
                            ->minItems(1)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }
}
