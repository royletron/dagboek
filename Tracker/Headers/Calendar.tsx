import dayjs = require('dayjs');
import * as React from 'react';
import TrackerContext from '../../context/TrackerContext';

export default function CalendarHeaders() {
  const { dayWidth, rangeInYears, xPosition } =
    React.useContext(TrackerContext);
  const [years, setYears] = React.useState(() => [
    <Year start={dayjs().format('YYYY-MM-DD')} dayWidth={dayWidth} />,
    <Year
      start={dayjs().subtract(1, 'year').format('YYYY-MM-DD')}
      dayWidth={dayWidth}
    />,
  ]);
  React.useMemo(() => {
    if (rangeInYears > 1) {
      setYears((current) => [
        ...current,
        <Year
          start={dayjs().subtract(rangeInYears, 'year').format('YYYY-MM-DD')}
          dayWidth={dayWidth}
        />,
        <Year
          start={dayjs()
            .add(rangeInYears - 1, 'year')
            .format('YYYY-MM-DD')}
          dayWidth={dayWidth}
        />,
      ]);
    }
  }, [rangeInYears]);
  return (
    <div
      style={{
        background: 'tomato',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: '50%' }}>
        <div
          style={{
            transform: `translate(${xPosition}px, 0px)`,
            position: 'relative',
          }}
        >
          {years}
        </div>
      </div>
    </div>
  );
}

const Year = React.memo(function MemoYear({
  start,
  dayWidth,
}: {
  start: string;
  dayWidth: number;
}) {
  const date = dayjs(start);
  const today = dayjs();
  const diff = today.diff(date, 'days');
  return (
    <div
      style={{
        position: 'absolute',
        left: -diff * dayWidth,
      }}
    >
      {new Array(dayjs(start).add(1, 'year').diff(date, 'days'))
        .fill(undefined)
        .map((v, idx) => {
          const d = date.clone().add(idx, 'days');
          const id = d.format('YYYY-MM-DD');
          return (
            <React.Fragment key={`header_${id}`}>
              {d.date() === 1 && (
                <div
                  key={`day_${id}`}
                  style={{
                    position: 'absolute',
                    left: idx * dayWidth,
                    top: 0,
                    width: '200px',
                  }}
                >
                  {d.month() === 0 ? d.format('YYYY MMMM') : d.format('MMMM')}
                </div>
              )}
              {d.day() === 1 && (
                <div
                  key={`month_${id}`}
                  style={{
                    position: 'absolute',
                    left: idx * dayWidth,
                    top: 22,
                  }}
                >
                  {d.date()}
                </div>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
});
