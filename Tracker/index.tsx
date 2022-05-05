import * as React from 'react';
import { TrackerContextProvider } from '../context/TrackerContext';
import Sidebar from '../Tracker/Sidebar';
import Headers from '../Tracker/Headers';
import Content from '../Tracker/Content';
import Row from '../Tracker/Row';
import HorizontalScroll from '../Tracker/HorizontalScroll';
import { FpsView } from 'react-fps';
import data from '../data';
import Sausage from '../Tracker/Sausage';
import RowGroup from '../Tracker/RowGroup';
import Sidelabel from '../components/Sidelabel';

export default function Tracker() {
  const ref = React.useRef();
  const [bounds, setBounds] = React.useState({
    width: 1024,
    height: 768,
  });
  React.useEffect(() => {
    const onResize = () => {
      const newBounds = ref?.current?.getBoundingClientRect();
      if (newBounds) {
        setBounds({ width: newBounds.width, height: newBounds.height });
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={ref}
    >
      <FpsView />
      <TrackerContextProvider canvasBounds={bounds}>
        <Headers height={50} />
        <Content>
          <Row
            side={<Sidelabel>Hello</Sidelabel>}
            main={
              <Sausage from={'2022-01-01'} to={'2022-05-01'} text={'Darren'} />
            }
          />
          {data.map((info, idx) => (
            <RowGroup key={`group_${idx}`} data={info.data} name={info.name} />
            // <Row
            //   key={`row_${idx}`}
            //   side={
            //     <div style={{ padding: 10 }}>
            //       <b>{info.name}</b>
            //     </div>
            //   }
            //   main={
            //     <Sausage
            //       key={`sausage_${idx}`}
            //       from={info.from}
            //       to={info.to}
            //       text={info.name}
            //     />
            //   }
            // />
          ))}
        </Content>
        <HorizontalScroll />
      </TrackerContextProvider>
    </div>
  );
}
