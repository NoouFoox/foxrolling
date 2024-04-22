# Vue 3 无缝滚动插件

## Installation 

```bash
# npm
npm install foxrolling

# yarn
yarn add foxrolling

# pnpm
pnpm install foxrolling
```
## Usage

```typescript
// main.ts or main.js
import foxrolling from "foxrolling"
app.use(foxrolling)
// or
import { RollComponent } from 'foxrolling';
app.component('RollComponent', RollComponent);
```

## Options

* speed (速度) 默认 1, number

* direction (滚动方向) 默认 "column" , 'row' | 'row-reverse' | 'column' | 'column-reverse'
