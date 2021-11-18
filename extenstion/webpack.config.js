const ExtensionReloader  = require('webpack-extension-reloader');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


const extensionPages = {
}


let config = {
  mode: process.env.NODE_ENV,
  context: __dirname + '/src'
};

let ExtensionConfig = Object.assign({}, config, {
    entry: {
      background: './background/index.js',
      ...extensionPages
    },
    output: {
      path: __dirname + '/extension/dist/',
      filename: '[name].dist.js',
    },
    plugins: [
      new ExtensionReloader({
        port: 9090,
        reloadPage: true,
        entries: {
          extensionPage: Object.keys(extensionPages),
          background: 'background'
        }
      }),
      new CopyPlugin([
        {
          from: './icons/*',
          to: __dirname + '/extension/dist/',
        },
        {
          from: './ui/facebook/profile picture/profile_picture.html',
          to: __dirname + '/extension/dist/fb_profile_picture.html',
        },
        {
          from: './ui/facebook/profile picture/profile_picture.css',
          to: __dirname + '/extension/dist/fb_profile_picture.css',
        },
        {
          from: './ui/facebook/profile picture/profile_picture.js',
          to: __dirname + '/extension/dist/fb_profile_picture.js',
        },
        {
          from: './ui/facebook/profile photos/profile_photos.html',
          to: __dirname + '/extension/dist/fb_profile_photos.html',
        },
        {
          from: './ui/facebook/profile photos/profile_photos.css',
          to: __dirname + '/extension/dist/fb_profile_photos.css',
        },
        {
          from: './ui/facebook/profile photos/profile_photos.js',
          to: __dirname + '/extension/dist/fb_profile_photos.js',
        },
        {
          from: './ui/instagram/profile picture/profile_picture.html',
          to: __dirname + '/extension/dist/instagram_profile_picture.html',
        },
        {
          from: './ui/instagram/profile picture/profile_picture.css',
          to: __dirname + '/extension/dist/instagram_profile_picture.css',
        },
        {
          from: './ui/instagram/profile picture/profile_picture.js',
          to: __dirname + '/extension/dist/instagram_profile_picture.js',
        },    {
          from: './ui/twitter/media/media.html',
          to: __dirname + '/extension/dist/twitter_media.html',
        },
        {
          from: './ui/twitter/media/media.css',
          to: __dirname + '/extension/dist/twitter_media.css',
        },
        {
          from: './ui/twitter/media/media.js',
          to: __dirname + '/extension/dist/twitter_media.js',
        },
      ]),
    ]
});

module.exports = [
    ExtensionConfig,
];
