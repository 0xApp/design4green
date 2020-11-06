import { FixedSizeGrid as Grid } from "react-window";
import  style1 from "./style.css";
const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 100;
const ROW_HEIGHT = 35;

const columns = [
  {
    key: "firstName",
    name: "First Name",
    width: 100
  },
  {
    key: "lastName",
    name: "Last Name",
    width: 100
  },
  {
    key: "email",
    name: "Email"
  }
];

  const data = [{
    name: 'Ayaan',
    age: 26
  }, {
    name: 'Ahana',
    age: 22
  }, {
    name: 'Peter',
    age: 40
  }, {
    name: 'Virat',
    age: 30
  }, {
    name: 'Rohit',
    age: 32
  }, {
    name: 'Dhoni',
    age: 37
  }]

  

  let regionList = data.length > 0
		&& data.map((item, i) => {
		return (
			<option key={i} value={item.name}>{item.age}</option>
		)
  }, this);

  let departmentList = data.length > 0
		&& data.map((item, i) => {
		return (
			<option key={i} value={item.name}>{item.age}</option>
		)
  }, this);

  let intercommunaliteList = data.length > 0
		&& data.map((item, i) => {
		return (
			<option key={i} value={item.name}>{item.age}</option>
		)
  }, this);

  let communeList = data.length > 0
		&& data.map((item, i) => {
		return (
			<option key={i} value={item.name}>{item.age}</option>
		)
  }, this);

  

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className="GridItem"
    style={{
      ...style,
      left: style.left + GUTTER_SIZE,
      top: style.top + GUTTER_SIZE,
      width: style.width - GUTTER_SIZE,
      height: style.height - GUTTER_SIZE
    }}
  >
    row {rowIndex}, col {columnIndex}
  </div>
);

const Table = () => (
  <Grid
    className="Grid"
    columnCount={20}
    columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
    height={300}
    rowCount={100}
    rowHeight={ROW_HEIGHT + GUTTER_SIZE}
    width={1340}
      columns={columns}
  >
    {Cell}
  </Grid>
);



export default function App() {
  return (
    <div style={{ margin: '100px 0px' }}>
    <div className="App" style={{ height: 500 }}>
      <div style={{ margin: '30px' }}>
        <label >Region</label>
        <select style={{ marginLeft: '10px', padding: '5px' }}
        >
          {regionList}
        </select>
        <label class={style1.textAlign}>Department</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {departmentList}
        </select>

        <label class={style1.textAlign}>Intercommunalites</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {intercommunaliteList}
        </select>

        <label class={style1.textAlign}>Commune</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {communeList}
        </select>

        <label class={style1.textAlign}>Choix de Point Refeerence</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={true}>Tout</option>
          <option value={false}>Region</option>
          <option value={false}>Department</option>
          <option value={false}>Intercommunalite</option>
        </select>
        </div>
        <div>
        <label class={style1.textAlign}>Donnees infra-communales</label>
        <select
          style={{ margin: '10px', padding: '5px' }}
        >
          <option value={false}>Oui</option>
          <option value={true}>Non</option>
        </select>

      </div>
      <Table />
    </div>
    </div>
  );
}




