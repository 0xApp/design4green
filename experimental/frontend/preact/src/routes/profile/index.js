import { h, render, Component } from 'preact';

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import style from './style.css';

const App = () => {
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

  const columns = [
    {
      header: 'name',
      key: 'user.name'
    },
    {
      header: 'Actions',

    }
  ]
  return (
    <div style={{ margin: '100px 0px' }}>
      <div style={{ margin: '30px' }}>
        <label >Region</label>
        <select style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={false}>Close</option>
          <option value={true}>Open</option>
        </select>
        <label class={style.textAlign}>Department</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={false}>Close</option>
          <option value={true}>Open</option>
        </select>

        <label class={style.textAlign}>Intercommunalites</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={false}>Close</option>
          <option value={true}>Open</option>
        </select>

        <label class={style.textAlign}>Commune</label>
        <select
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value={false}>Close</option>
          <option value={true}>Open</option>
        </select>

        <label class={style.textAlign}>Choix de Point Refeerence</label>
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
        <label class={style.textAlign}>Donnees infra-communales</label>
        <select
          style={{ margin: '10px', padding: '5px' }}
        >
          <option value={false}>Oui</option>
          <option value={true}>Non</option>
        </select>

      </div>
      <ReactFlexyTable
        data={data} className={style.tableCSS}
      />
    </div>
  )
}

export default App




