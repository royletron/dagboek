import * as React from 'react';
import Sidelabel from '../../components/Sidelabel';
import Row from '../../Tracker/Row';
import Sausage from '../../Tracker/Sausage';

export default function RowGroup({ name, data }) {
  const [open, setOpen] = React.useState(false);
  const content = React.useMemo(() => {
    console.log('memo');
    return data.map((info, idx) => (
      <Row
        key={`row_${idx}`}
        side={
          <div style={{ padding: 10, background: 'white' }}>
            <b>{info.name}</b>
          </div>
        }
        main={
          <Sausage
            key={`sausage_${idx}`}
            from={info.from}
            to={info.to}
            text={info.name}
          />
        }
      />
    ));
  }, [data]);
  return (
    <React.Fragment>
      <Row
        side={
          <div
            onClick={() => {
              console.log('heyl');
              setOpen((current) => !current);
            }}
            style={{ cursor: 'pointer' }}
          >
            <Sidelabel>{name}</Sidelabel>
          </div>
        }
        main={'eerrr'}
      />
      {open && content}
    </React.Fragment>
  );
}
