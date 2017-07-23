# Size table
This is a Wordpress/WooCommerce plugin allowing you to add sizing tables to your products.

## Installation
Two options:
1. Upload `/dist/size-table` to you plugin folder via FTP
2. Upload `/dist/size-table.zip` via the WP UI

## Usage
Each product has a new tab "Size table". To show a size table for this product tick the checkbox. Click in any of the fields to update the values:
![image](https://user-images.githubusercontent.com/5756475/28501636-f371e110-6fd7-11e7-9802-0762fc993048.png)


## Build
```sh
git clone git@github.com:dreischer/size-table.git
yarn install
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
