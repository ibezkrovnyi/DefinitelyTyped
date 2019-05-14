  import * as React from 'react';

  type Id<T> = { [K in keyof T]: T[K] };

  type UncontrollableProps<
    ComponentProps,
    PropHandlerHash,
    PropHandlerHashKeys extends string = Extract<keyof PropHandlerHash, string>,
    Handlers extends string = Extract<PropHandlerHashKeys extends keyof PropHandlerHash ? PropHandlerHash[PropHandlerHashKeys] : never, string>
  > = Id<
        & { [K in Exclude<keyof ComponentProps, PropHandlerHashKeys | Handlers>]: ComponentProps[K] }
        & { [K in PropHandlerHashKeys | Handlers]?: K extends keyof ComponentProps ? ComponentProps[K] : never }
      >;

  type FunctionProperties<T extends object, K = keyof T> =
    K extends keyof T
      ? T[K] extends (...args: any[]) => any ? K : never
      : never;

  type Methods<C> = C extends new (...args: any[]) => any ? FunctionProperties<InstanceType<C>>[] : never;

  function uncontrollable<
    C extends React.JSXElementConstructor<any>,
    H extends Partial<{ [key in keyof P]: string }>,
    P = React.ComponentProps<C>,
  >(
    component: C,
    propHandlerHash: H,
    methods?: Methods<C>,
  ): string extends H[keyof H] ? never : React.ComponentType<UncontrollableProps<P, H>>
  
  export default uncontrollable;
