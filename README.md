# React Component Library for DNP Projects

This repository houses generic, reusable React components for DNP projects.

## Install

```shell
yarn add @douglasneuroinformatics/react-components
```

## Usage

**tailwind.config.js**

```javascript
import { createConfig } from '@douglasneuroinformatics/react-components/tailwind.utils.cjs';

export default createConfig({
  content: ['./src/**/*.{ts,tsx}']
});

```

## Development

### Compile Library

```shell
yarn build
```