# Angular Form Components Collection

This is a collection of simple, stylable form components, which (should be) working on all relevant browsers. It is supposed to bridge the issue of some of the HTML 5 inputs (like type: "range") not working on select platforms (e.g. iOS).

## Quick Start

### Angular Version
This library was built with the Angular CLI 7.1.0, you may run into issues using this with a lower version.

### Installation

`npm i ngx-form-components --save`

### Import the module

```ts
import { NgxFormComponentsModule } from 'ngx-form-components';

@NgModule({
  imports: [
    // ...
    NgxFormComponentsModule,
    ...
  ]
})
```

### Add the component to you html file

```html
<form class="your-form>
  ...
  <nfc-range-input></nfc-range-input>
  ...
</form>
```

## API

... coming soon
