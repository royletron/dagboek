import * as React from 'react';

export default function useStateWithOverride(initialAndOverride) {
  const [value, setValue] = React.useState(initialAndOverride);
  React.useMemo(() => setValue(initialAndOverride), [initialAndOverride]);
  return [value, setValue];
}
