import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import useStateWithOverride from '../utils/useStateWithOverride';

const TrackerContext = React.createContext(undefined);

export default TrackerContext;

type TrackerContextProps = {
  children: React.ReactNode;
  initialSidebarWidth?: number;
  canvasBounds: { width: number; height: number };
  currentDate?: Dayjs;
  dayWidth?: number;
};

const defaults: Partial<TrackerContextProps> = {
  initialSidebarWidth: 250,
  currentDate: dayjs(),
  dayWidth: 10,
};

export function TrackerContextProvider({
  children,
  ...props
}: TrackerContextProps) {
  const { initialSidebarWidth, canvasBounds, dayWidth } = {
    ...defaults,
    ...props,
  };
  const [sidebarWidth, setSidebarWidth] =
    useStateWithOverride(initialSidebarWidth);
  const [rangeInYears, setRangeInYears] = React.useState(1);
  const [xPosition, setXPosition] = React.useState(0);
  const currentDay = React.useMemo(() => {
    const pos = xPosition / dayWidth;
    if (isNaN(pos)) {
      return 0;
    }
    return Math.floor(-pos);
  }, [xPosition]);
  const rangeInDays = rangeInYears * 365;
  const rangeInPixels = rangeInDays * dayWidth;
  React.useMemo(() => {
    if (currentDay > rangeInDays * 0.66 || currentDay < -rangeInDays * 0.66) {
      // add another year!
      setRangeInYears((current) => current + 1);
    }
  }, [currentDay]);
  return (
    <TrackerContext.Provider
      value={{
        sidebarWidth,
        canvasBounds,
        rangeInDays,
        rangeInYears,
        dayWidth,
        xPosition,
        setXPosition,
        rangeInPixels,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
