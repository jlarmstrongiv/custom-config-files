<!--
TODO

Use a virtual file system for tests
https://github.com/streamich/memfs

Build a documentation website
https://github.com/documentationjs/documentation#documentation

Set up code quality and CI Testing badges, rather than manual checking

Find sensible linux and windows defaults for globalDir

Add (static) methods to the Config class to compare and merge multiple configs, similar to https://github.com/rt2zz/redux-persist#state-reconciler as well as incoming settings

Add read and write cson
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

Documentation website [coming soon](http://jlarmstrongiv.github.io/custom-config-files/)! <!-- https://github.com/documentationjs/documentation#documentation -->

### Initialize

```jsx
// import package
const Config = require('custom-config-files').default;

// setup instance
const config = new Config({
  rootName: 'myconfigrc', // required, file patterns .myconfigrc.json
  globalDir: '~/.config/myconfig', // required, see https://github.com/kirsle/configdir
  localDir: `${process.cwd()}/myconfig`, // optional, defaults to process.cwd()
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

let extensions;
// defaults to fileTypes.json for `output` method
extensions = fileTypes.json;
// defaults to all available fileTypes for `read` and `remove` methods
extensions = [fileTypes.json, fileTypes.js, fileTypes.env, fileTypes.yml,];
```

#### Output Files

```jsx
// outputs config file to local dir
config.outputLocal(extensions);

// outputs config file to global dir
config.outputGlobal(extensions);
```

#### Read Files
```jsx
// finds most recent local config file
config.readLocal(extensions);

// finds most recent global config file
config.readGlobal(extensions);

// combination, checks local then global
config.read(extensions);

// all default to `null` if not found
```

#### Remove Files
```jsx
// removes a local config file
config.removeLocal(extensions);

// removes a global config file
config.removeGlobal(extensions);

// removes the entire global config folder
// only use if you have a custom folder for your global configs
config.removeGlobalDir();
```

### Low Level API
Documentation website [coming soon](http://jlarmstrongiv.github.io/custom-config-files/).  See comments in files under `./src/utils`.
