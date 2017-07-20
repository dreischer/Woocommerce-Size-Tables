# Size table
This is a Wordpress/WooCommerce plugin allowing you to add sizing tables to your products.

## Installation
Two options:
1. Upload `/dist/size-table` to you plugin folder via FTP
2. Upload `/dist/size-table.zip` via the WP UI

## Usage

## Build
```sh
git clone git@github.com:dreischer/size-table.git
npm install
make build
```
This will create the contents of `/dist/`

## Development
To work on the backend UI run
```sh
make watch
```
This will recompile `/js` whenever you make changes. Open `index.html` to preview the backend

## Tech
This plugin uses
- Preact
- Webpack
- Buble
- Standard.js
