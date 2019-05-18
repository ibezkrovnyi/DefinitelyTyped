import React from 'react';
import uncontrollable from 'uncontrollable';

// Prepare
type ComponentProps = {
  date: Date,
  onDateChange: (value: Date) => void,
  time: string,
  onTimeChange: (value: string) => void,
}

class Component extends React.Component<ComponentProps> {
  funcProp = () => {}
  method() { }
}

// === Class tests
{

  // No errors
  {
    uncontrollable(Component, {
      date: 'onDateChange',
    });

    uncontrollable(Component, {
      date: 'onDateChange',
      time: 'onTimeChange',
    } as const);

    uncontrollable(Component, {
      date: 'onDateChange',
    }, ['setState', 'funcProp', 'method']);
  }

  // Errors
  {
    const propHandlerHash = {
      date: 'onDateChange',
    };
    uncontrollable(Component, propHandlerHash); // $ExpectError

    uncontrollable(Component, {
      date: 'onDateChange1', // $ExpectError
    });

    uncontrollable(Component, {
      date1: 'onDateChange', // $ExpectError
    });

    uncontrollable(Component, {
      date1: 'onDateChange2', // $ExpectError
    });

    uncontrollable(Component, {
      date: 'onDateChange',
    }, ['setState', 'a']); // $ExpectError

    const FunctionalComponent = (props: ComponentProps) => <div />;
    uncontrollable(FunctionalComponent, { // $ExpectError
    });
  }
}
// === Instance tests
{
  const UncontrollableComponent = uncontrollable(Component, {
    date: 'onDateChange',
  }, ['setState', 'funcProp', 'method']);

  // No errors
  {
    // TODO: not ready
    const ok = <UncontrollableComponent onTimeChange={() => { }} time="1" ref={ref => {
      ref.setState({});
      ref.funcProp();
      ref.method();
    }} />;
  }

  // Errors
  {
    // $ExpectError
    const timeIsWrong = <UncontrollableComponent onTimeChange={() => { }} time={1} />

    // $ExpectError
    const onTimeChangeIsMissing = <UncontrollableComponent time="1" />
  }
}
