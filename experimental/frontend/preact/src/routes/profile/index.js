import { h, render, Component } from 'preact';

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

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
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div style={{ margin: '30px' }}>
              <label>Region</label><br></br>
              <select style={{ padding: '5px' }}
              >
                <option value={false}>Close</option>
                <option value={true}>Open</option>
              </select>
            </div>
            <div style={{ margin: '30px' }}>
              <label>Department</label><br></br>
              <select
                style={{ padding: '5px' }}
              >
                <option value={false}>Close</option>
                <option value={true}>Open</option>
              </select>
            </div>
            <div style={{ margin: '30px' }}>
              <label>Intercommunalites</label><br></br>
              <select
                style={{ padding: '5px' }}
              >
                <option value={false}>Close</option>
                <option value={true}>Open</option>
              </select>
            </div>
            <div style={{ margin: '30px' }}>
              <label>Commune</label><br></br>
              <select
                style={{ padding: '5px' }}
              >
                <option value={false}>Close</option>
                <option value={true}>Open</option>
              </select>
            </div>
            <div style={{ margin: '30px' }}>
              <label>Choix de Point Refeerence</label><br></br>
              <select
                style={{ padding: '5px' }}
              >
                <option value={false}>Close</option>
                <option value={true}>Open</option>
              </select>
            </div>
          </div>
          <div class="col-sm-9">
            <ReactFlexyTable
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App




