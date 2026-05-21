import * as React from 'react';

/**
 * Polymorphic component types for "as" prop support
 */

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = Record<string, never>
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type {
  AsProp,
  PolymorphicComponentProp,
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
};
