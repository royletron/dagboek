import * as React from 'react';
import dayjs from 'dayjs';
import TrackerContext from '../../context/TrackerContext';
import getRelativeCoordinates from '../../utils/getRelativeCoordinates';
import useStateWithOverride from '../../utils/useStateWithOverride';

function Sausage({ from, to, text }) {
  const { dayWidth, xPosition, canvasBounds, sidebarWidth, getXPoint } =
    React.useContext(TrackerContext);
  const [localFrom, setLocalFrom] = useStateWithOverride(from);
  const [localTo, setLocalTo] = useStateWithOverride(to);
  const labelRef = React.useRef();
  const leftRef = React.useRef();
  const rightRef = React.useRef();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const left = React.useMemo(() => getXPoint(localFrom), [localFrom, dayWidth]);
  const width = React.useMemo(
    () => getXPoint(localTo) - left,
    [left, localTo, dayWidth]
  );
  React.useEffect(() => {
    if (labelRef.current) {
      const spanWidth = labelRef.current.getBoundingClientRect().width;
      setLabelWidth(spanWidth);
    }
  }, []);
  const spanLeft = React.useMemo(() => {
    const boundaryLeft = -xPosition - (canvasBounds.width - sidebarWidth) / 2;
    const diff = boundaryLeft - left;
    if (diff < 0) {
      return 0;
    } else if (diff > 0) {
      if (diff > width - labelWidth) {
        return width - labelWidth;
      }
      return diff;
    }
  }, [left, xPosition, canvasBounds.width]);
  const [dragging, setDragging] = React.useState(false);
  const onRightMove = React.useCallback(
    (e) => {
      const coords = getRelativeCoordinates(e, rightRef.current);
      setLocalTo((current) => {
        return dayjs(current)
          .add(Math.floor((coords.x - xPosition) / dayWidth), 'days')
          .format('YYYY-MM-DD');
      });
    },
    [setLocalTo, xPosition]
  );
  const onLeftMove = React.useCallback(
    (e) => {
      const coords = getRelativeCoordinates(e, leftRef.current);
      setLocalFrom((current) =>
        dayjs(current)
          .add(Math.floor((coords.x - xPosition) / dayWidth), 'days')
          .format('YYYY-MM-DD')
      );
    },
    [setLocalFrom, xPosition]
  );
  const rightDown = () => {
    const onUp = () => {
      window.removeEventListener('mousemove', onRightMove);
      window.removeEventListener('mouseup', onUp);
      setDragging(false);
    };
    setDragging(true);
    window.addEventListener('mousemove', onRightMove);
    window.addEventListener('mouseup', onUp);
  };
  const leftDown = () => {
    setDragging(true);
    const onUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', onLeftMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onLeftMove);
    window.addEventListener('mouseup', onUp);
  };
  const leftTotal = left;
  return (
    <React.Fragment>
      <div
        style={{
          background: 'blue',
          position: 'absolute',
          height: 30,
          width: 5,
          left: leftTotal - 7,
          top: 5,
          cursor: 'col-resize',
        }}
        ref={leftRef}
        onMouseDown={leftDown}
      />
      <div
        style={{
          background: 'red',
          position: 'absolute',
          height: 30,
          width,
          top: 5,
          left: leftTotal,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: spanLeft,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            padding: '4px',
            maxWidth: width - 8,
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: dragging ? 'none' : 'auto',
          }}
          ref={labelRef}
        >
          {text}
        </span>
      </div>
      <div
        style={{
          background: 'blue',
          position: 'absolute',
          height: 30,
          width: 5,
          left: leftTotal + width + 2,
          top: 5,
          cursor: 'col-resize',
        }}
        ref={rightRef}
        onMouseDown={rightDown}
      />
    </React.Fragment>
  );
}

export default React.memo(Sausage);
