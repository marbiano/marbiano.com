import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}
