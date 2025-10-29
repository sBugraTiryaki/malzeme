<?php

use App\Models\Setting;
use Inertia\Testing\AssertableInertia as Assert;

test('footer settings are shared with the public layout', function () {
    Setting::set('footer_brand_title', 'Test Kulübü', 'text', 'footer');
    Setting::set('footer_brand_description', 'Test açıklaması', 'textarea', 'footer');
    Setting::set('contact_email', 'iletisim@metalurji.test', 'email', 'contact');
    Setting::set('contact_phone', '+90 123 456 78 90', 'text', 'contact');
    Setting::set('contact_address', 'Test Kampüsü', 'textarea', 'contact');
    Setting::set('footer_copyright_notice', 'Test Kulübü. Tüm hakları saklıdır.', 'text', 'footer');

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->where('footer.brand.title', 'Test Kulübü')
            ->where('footer.brand.description', 'Test açıklaması')
            ->where('footer.contact.email', 'iletisim@metalurji.test')
            ->where('footer.contact.phone', '+90 123 456 78 90')
            ->where('footer.contact.address', 'Test Kampüsü')
            ->where('footer.copyright', 'Test Kulübü. Tüm hakları saklıdır.')
        );
});
