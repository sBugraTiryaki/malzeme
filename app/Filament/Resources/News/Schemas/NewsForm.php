<?php

namespace App\Filament\Resources\News\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Haber Bilgileri')
                    ->schema([
                        TextInput::make('title')
                            ->label('Başlık')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)))
                            ->columnSpanFull(),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->helperText('URL için kullanılacak benzersiz isim'),

                        Textarea::make('excerpt')
                            ->label('Özet')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('Haber listesinde görünecek kısa özet'),

                        RichEditor::make('content')
                            ->label('İçerik')
                            ->required()
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

                        FileUpload::make('image')
                            ->label('Görsel')
                            ->image()
                            ->directory('news')
                            ->columnSpanFull(),

                        TextInput::make('author')
                            ->label('Yazar'),

                        DateTimePicker::make('published_at')
                            ->label('Yayın Tarihi')
                            ->native(false),

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
