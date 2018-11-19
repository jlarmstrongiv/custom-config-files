<!--
TODO

Use a virtual file system for tests
https://github.com/streamich/memfs

Build a documentation website
https://github.com/documentationjs/documentation#documentation
-->

# custom-config-files
![](https://source.unsplash.com/gpKe3hmIawg)
---
> Output, read, and remove both local and global configs from .json, .js, .env, and .yml files with Node.js

[![npm-version](https://img.shields.io/npm/v/custom-config-files.svg)](https://www.npmjs.com/package/custom-config-files)
[![dependencies](https://david-dm.org/jlarmstrongiv/custom-config-styles/status.svg)](https://david-dm.org/jlarmstrongiv/custom-config-files)
[![dev dependencies](https://david-dm.org/jlarmstrongiv/custom-config-styles/dev-status.svg)](https://david-dm.org/jlarmstrongiv/custom-config-files?type=dev)
[![license](https://img.shields.io/badge/license-MIT-green.svg)]()
[![license](https://img.shields.io/badge/test%20coverage-97.67%25-green.svg)]()

## Highlights

- Local and global configs
- Output, read, remove
- json, js, env, yml

## Install

`npm install custom-config-files`

`yarn add custom-config-files`

## Usage

Documentation website [coming soon](http://jlarmstrongiv.github.io/custom-config-files)! <!-- https://github.com/documentationjs/documentation#documentation -->

### Initialize

```jsx
// import package
const Config = require('custom-config-files').default;

// setup instance
const config = new Config({
  rootName: 'myconfigrc',
  globalDir: '~/dotfiles/config',
  localDir: './current-working-directory', // optional, defaults to process.cwd()
})

// edit instance variables
config.setFileRoot(fileRoot);
config.setLocalDir(localDir);
config.setGlobalDir(globalDir);
```

### Methods

#### Extensions
```jsx
const fileTypes = require('custom-config-files').fileTypes;

// extensions are optional, and are used to
// specify output or filter input

let extensions; // Defaults to all if null
const extensions = fileTypes.json;
const extensions = [fileTypes.json, fileTypes.js, fileTypes.env, fileTypes.yml,];
```

#### Output Files

```jsx
// outputs config to local dir
config.outputLocal(extensions);

// outputs config to global dir
config.outputGlobal(extensions);
```

#### Read Files
```jsx
// find most recent local file
config.readLocal(extensions);

// find most recent global file
config.readGlobal(extensions);

// combination, checks local then global
config.read(extensions);

// all default to `null` if not found
```

#### Remove Files
```jsx
// Removes a local config file
config.removeLocal(extensions);

// Removes a global config file
config.removeGlobal(extensions);

// Removes the entire global config folder
config.removeGlobalDir();
```

### Low Level API
Documentation website [coming soon](http://jlarmstrongiv.github.io/custom-config-files).  See comments in files under `./src/utils`.
