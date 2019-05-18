// Type definitions for uncontrollable 6.1
// Project: https://www.npmjs.com/package/uncontrollable
// Definitions by: ibezkrovnyi <https://github.com/ibezkrovnyi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.0

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

type ComponentInstanceMethods<C extends ClassComponentJSXElementConstructor> = FunctionProperties<InstanceType<C>>[];

type ClassComponentJSXElementConstructor = new (props: any) => React.Component<any, any>;

type AreSame<A, B> = A extends B
  ? B extends A ? true : false
  : false;

declare function uncontrollable<
  C extends ClassComponentJSXElementConstructor,
  H extends Partial<{ [K in keyof H]: K extends keyof P ? keyof P : never }>,
  M extends FunctionProperties<I>[],
  I extends object = InstanceType<C>,
  P = React.ComponentProps<C>,
>(
  component: C,
  propHandlerHash: H,
  methods?: M,
): React.ComponentClass<UncontrollableProps<P, H>>;

export default uncontrollable;
