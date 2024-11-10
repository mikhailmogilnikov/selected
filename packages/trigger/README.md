# Trigger

The `Trigger` component is a versatile React component designed to handle various user interactions such as clicks, hovers, and key presses. It provides a flexible API to customize the behavior of these interactions.

## Installation

```bash
npm install @mikhailmogilnikov/trigger
```

## Usage

### Basic Example (Click)

```tsx
import { Trigger } from '@mikhailmogilnikov/trigger';

<Trigger onTrigger={() => console.log('Clicked!')}>
  Click Me
</Trigger>
```

### Advanced Example

```tsx
<Trigger
  asChild // Spread all trigger props to the child element
  action={['right-click', 'long-press', 'double-click']}
  pointerType="mouse" // Define pointer type (default is 'all')
  onTrigger={(e) => console.log('Open context menu!')}
>
  <Button>Open</Button>
</Trigger>
```

## Props

| Prop                 | Description                                                               | Type                              | Default     |
| -------------------- | ------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `ref`                | Ref to the button element.                                                | `Ref<HTMLButtonElement> \| null`  | `null`      |
| `asChild`            | If `true`, renders the component as a child element.                      | `boolean`                         | `false`     |
| `action`             | The type of action to trigger the event.                                  | `TriggerAction`                   | `'click'`   |
| `onTrigger`          | Callback function when the trigger action occurs.                         | `(event: SyntheticEvent) => void` | `undefined` |
| `onTriggerEnd`       | Callback function when the trigger action ends.                           | `(event: SyntheticEvent) => void` | `undefined` |
| `onStartInteracting` | Callback function when interaction starts.                                | `(event: SyntheticEvent) => void` | `undefined` |
| `onEndInteracting`   | Callback function when interaction ends.                                  | `(event: SyntheticEvent) => void` | `undefined` |
| `propagation`        | If `true`, event propagation is allowed.                                  | `boolean`                         | `false`     |
| `preventDefault`     | If `true`, prevents the default action of the event.                      | `boolean`                         | `true`      |
| `pointerType`        | Specifies the type of pointer interaction.                                | `PointerType`                     | `'all'`     |
| `delay`              | Delay in milliseconds before the trigger action is executed.              | `number`                          | `0`         |
| `endDelay`           | Delay in milliseconds before the trigger action ends.                     | `number`                          | `delay`     |
| `keyCode`            | The key code to listen for when `action` is set to `key-press`.           | `string`                          | `undefined` |
| `commandKey`         | If `true`, requires the command key to be pressed for `key-press` action. | `boolean`                         | `false`     |
| `shiftKey`           | If `true`, requires the shift key to be pressed for `key-press` action.   | `boolean`                         | `false`     |

## Examples

### Hover + Focus Action

```tsx
<Trigger
  action={['hover', 'focus']}
  delay={200} // Provide delay in milliseconds (default is 0)
  endDelay={100} // optional delay when element is unhovered or unfocused (default same as delay)
  onTrigger={(e) => console.log('Button hovered!')}
  onTriggerEnd={(e) => console.log('Button unhovered!')}
>
  Hover Me
</Trigger>
```

### Long Press Action

```tsx
<Trigger
  action="long-press"
  delay={500}
  // Called when the user starts pressing the button
  onStartInteracting={(e) => console.log('Button pressed!')}
  // Called after the delay
  onTrigger={(e) => console.log('Triggered!')}
>
  Long Press Me
</Trigger>
```

### Key Press Action

```tsx
<Trigger
  action="key-press"
  keyCode="Enter" // Key code to listen for
  commandKey // Cmd on Mac, Ctrl on Windows
  onTrigger={(e) => console.log('Command+Enter key pressed!')}
>
  Press Command+Enter
</Trigger>
```

### Right Click Action

```tsx
<Trigger
  action="right-click"
  onTrigger={(e) => console.log('Right clicked!')}
>
  Open context menu
</Trigger>
```

### Nested Trigger Actions

You can nest trigger actions to create more complex interactions.

```tsx
<Trigger
  asChild
  action="hover"
  delay={200}
  onTrigger={(e) => console.log('Button hovered!')}
>
  <Trigger
    asChild
    action="click"
    onTrigger={(e) => console.log('Button clicked!')}
  >
    <Button>Click Me</Button>
  </Trigger>
</Trigger>
```

```html
<!-- output in DOM (no additional wrappers) -->
<button>Click Me</button>
```

## Types

### PointerType

`PointerType` is a union type that specifies the type of pointer interaction allowed. It can be one of the following:

- `'all'`: Allows all types of pointer interactions.
- `'mouse'`: Allows only mouse interactions.
- `'touch'`: Allows only touch interactions.
- `'pen'`: Allows only pen interactions.
- `'keyboard'`: Allows only keyboard interactions.

### TriggerAction

`TriggerAction` is a union type that defines the possible actions that can trigger an event. It includes:

- `'click'`: Triggered by a mouse click.
- `'right-click'`: Triggered by a right mouse click.
- `'double-click'`: Triggered by a double tap.
- `'hover'`: Triggered when the mouse hovers over the element.
- `'press'`: Triggered by a pointer press.
- `'long-press'`: Triggered by a long pointer press.
- `'focus'`: Triggered when the element gains focus.
- `'key-press'`: Triggered by a specific key press.
