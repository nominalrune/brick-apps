<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['/*'],

    'allowed_methods' => ['GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'OPTIONS'],

    'allowed_origins' => ["http://localhost:5173","http://localhost:5174","http://localhost:4173"],

    'allowed_origins_patterns' => ['localhost'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 12000,

    'supports_credentials' => true,

];
