// yyyy-mm-dd

const data = [
  {
    name: 'Google Analytics Stuff',
    from: '2021-12-01',
    to: '2022-01-15',
  },
  {
    name: 'LinkedIn: Something',
    from: '2021-11-01',
    to: '2022-03-15',
  },
  {
    name: 'Google Analytics ',
    from: '2022-01-12',
    to: '2022-03-15',
  },
  {
    name: 'Google Analytics Stuff',
    from: '2022-02-14',
    to: '2022-06-12',
  },
  {
    name: 'Long Test!',
    from: '2022-05-02',
    to: '2022-05-07',
  },
  {
    name: 'Long Test 2!',
    from: '2022-05-02',
    to: '2022-05-08',
  },
];

const groups = [
  {
    name: 'Test Grouping A',
    data: [...data, ...data],
  },
  {
    name: 'Test Grouping B',
    data: data,
  },
  {
    name: 'Test Grouping C',
    data: data,
  },
  {
    name: 'Test Grouping D',
    data: data,
  },
  {
    name: 'Test Grouping E',
    data: data,
  },
  {
    name: 'Test Grouping F',
    data: data,
  },
];

export default groups;
