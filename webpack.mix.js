const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/index.js', 'assets/js');
mix.sass("resources/css/index.scss", 'assets/css').options({
        processCssUrls: false
    })    ;
    
mix.webpackConfig({
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.join(__dirname, "resources/js/"),
            }
        },
        // target: 'web'
    });