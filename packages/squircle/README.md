# Squircle

The `Squircle` component is designed to render a squircle in React applications.

## Installation

```bash
npm install @mikhailmogilnikov/squircle
```

## Usage

```tsx
import { Squircle } from '@mikhailmogilnikov/squircle';

<Squircle
  smoothing={0.6} // iOS-like smoothing
  asChild
  className="rounded-2xl"
>
  <div className="w-full h-full bg-zinc-800">
    Content
  </div>
</Squircle>
```

## Props

### `smoothing` (optional)

- **Type:** `number`
- **Default:** `0`
- **Description:** The level of corner smoothing from 0 to 1. If not specified, the value from the CSS variable `--corner-smoothing` is used. If smoothing is 0, components will not have any smoothing-related logic like `intersection observer` and will be rendered as a simple html `div` element.

### `asChild` (optional)

- **Type:** `boolean`
- **Description:** If `true`, the component will render as a child element, spreaded all props to him.

### `resizable` (optional)

- **Type:** `boolean`
- **Default:** `true`
- **Description:** If `true`, the component will resize based on `Intersection Observer API`.

### `throttlingDelayMs` (optional)

- **Type:** `number`
- **Default:** `150`
- **Description:** Delay in milliseconds for throttling size changes if resizable toggled on.

### `wrapperClassname` (optional)

- **Type:** `string`
- **Description:** CSS class for the component's wrapper. Provides an ability to apply box-shadow and outline for the squircle.

### `wrapperRadius` (optional)

- **Type:** `number`
- **Description:** The radius of the component's wrapper. Useful if wrapper's `box-shadow` doesn't fits well with squircle rounded corners.

### `width` (optional)

- **Type:** `number`
- **Description:** The width of the component. If not specified, the width of the parent element is used.

### `height` (optional)

- **Type:** `number`
- **Description:** The height of the component. If not specified, the height of the parent element is used.

### Other Props

- **Type:** `ComponentPropsWithoutRef<'div'>`
- **Description:** Any other props that can be passed to a `<div>` element.

## Example

```tsx
import { Squircle } from '@mikhailmogilnikov/squircle';

<Squircle
  smoothing={0.8}
  wrapperRadius={15}
  wrapperClassname="my-squircle"
  throttlingDelayMs={100}
  asChild={true}
  resizable={false}
  width={150}
  height={150}
/>
```

This example creates a squircle with a smoothing level of 0.8, a wrapper radius of 15, with the class `my-squircle`, no resizing, and a fixed width and height of 150 pixels.

## Credits

This component was inspired by [Squircle.js](https://github.com/bring-shrubbery/squircle-js).
