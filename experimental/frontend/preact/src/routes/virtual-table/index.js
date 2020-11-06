import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Column, Table, InfiniteLoader, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import VirtualSelect from '../../components/virtualselect';

let pageSize = 100;
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "criteria": {
            "pageIndex": 0,
            "pageSize": pageSize,
            "referencePoint": "ALL"
        }
    })
};
const getFormattedOptions = (options) => {
    return options.map(item => {
        return { label: item.Name, value: item.Id }
    })
}
const VirtualTable = () => {
    const [rowData, setRowData] = useState([]);

    const [regionOptions, setRegionOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [communeOptions, setCommuneOptions] = useState([]);
    const [interCommuneOptions, setInterCommuneOptions] = useState([]);

    const [criteria, setCriteria] = useState({
        criteria: {
            region: {
                data: "",
                exclude: false
            },
            department: {
                data: "",
                exclude: false
            },
            intercommnality: {
                data: "",
                exclude: false
            },
            commune: {
                data: "",
                exclude: false
            },
            "referencePoint": "",
            "scoreMinValue": "",
            "scoreMaxValue": "",
            "calcul": false,
            "pageIndex": 0,
            "pageSize": 100
        }

    });

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:3000/datas", requestOptions);

            res
                .json()
                .then(res => { setRowData(res.scores); })
                .catch(err => console.log(err));

            const filterResponse = await fetch("http://localhost:3000/master");
            filterResponse
                .json()
                .then(res => {
                    console.log('res ', res);
                    setRegionOptions(getFormattedOptions(res.region_master));
                    setDepartmentOptions(getFormattedOptions(res.Department_Master));
                    setCommuneOptions(getFormattedOptions(res.Commune_Master));
                    setInterCommuneOptions(getFormattedOptions(res.interCommune_master));
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            console.log('effect pageIndex ');
            requestOptions.body = JSON.stringify(criteria);
            const res = await fetch("http://localhost:3000/datas", requestOptions);
            res
                .json()
                .then(response => { setRowData(response.scores); })
                .catch(err => console.log(err));
        };
        fetchData();
    }, [criteria]);


    const onSelectChangeHandler = (selectedOption, name) => {

        if (name === 'Region' || name === 'Department' || name === 'InterCommune' || name === 'Commune') {
            const tmpcriteria = { ...criteria };
            tmpcriteria.criteria.region.data = selectedOption.label;
            setCriteria(tmpcriteria);
        }

    }

    const calculatePageIndex = (startIndex) => {
        const calculatedPageIndex = startIndex / pageSize;
        return calculatedPageIndex;

    }
    const loadMore = (indices) => {
        console.log('indices ', indices)
        const calculatedPageIndex = calculatePageIndex(indices.startIndex);
        console.log('calculatedPageIndex ', calculatedPageIndex)
        const tmpcriteria = { ...criteria };
        tmpcriteria.criteria.pageIndex = calculatedPageIndex;
        requestOptions.body = JSON.stringify(tmpcriteria);
        return fetch("http://localhost:3000/datas", requestOptions)
            .then(res => res.json())
            .then(res => { setRowData([...rowData, ...res.scores]) })
            .catch(err => console.log(err));
    }

    return (<div style={{ marginTop: '60px' }}>
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '5px' }}><label>Region</label>
                <VirtualSelect name={'Region'} options={regionOptions} onSelectChange={onSelectChangeHandler} />
            </div>
            <div style={{ marginLeft: '5px' }}><label>Departement</label>
                <VirtualSelect name={'Department'} options={departmentOptions} onSelectChange={onSelectChangeHandler} />
            </div>
            <div style={{ marginLeft: '5px' }}><label>Intercommunalities</label>
                <VirtualSelect name={'InterCommune'} options={interCommuneOptions} onSelectChange={onSelectChangeHandler} />
            </div>
            <div style={{ marginLeft: '5px' }}><label>Commune</label>
                <VirtualSelect name={'Commune'} options={communeOptions} onSelectChange={onSelectChangeHandler} />
            </div>
        </div>

        <div>

            <InfiniteLoader
                isRowLoaded={({ index }) => rowData[index]}
                loadMoreRows={loadMore}
                rowCount={1000000}
                threshold={20}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ width }) => (
                            <Table
                                ref={registerChild}
                                onRowsRendered={onRowsRendered}
                                headerHeight={40}
                                width={width}
                                height={500}
                                rowHeight={40}
                                rowCount={rowData.length}
                                rowGetter={({ index }) => rowData[index]}
                            >
                                <Column label="Nom Com" dataKey="nomCom" width={200} />
                                <Column label="Code Iris" dataKey="codeIris" width={200} />
                                <Column label="Rank of SCORE GLOBAL" dataKey="scoreRank" width={200} />
                                <Column label="Nom Iris" dataKey="nomIris" width={200} />
                                <Column label="Population" dataKey="populationScore" width={200} />
                                <Column label="SCORE GLOBAL" dataKey="scoreGlobal" width={200} />
                                <Column label="ACCÈS AUX INTERFACES NUMERIQUES" dataKey="accessAuxInterfaceNumber" width={200} />
                                <Column label="ACCES A L'INFORMATION" dataKey="accessInformation" width={200} />
                                <Column label="COMPETENCES ADMINISTATIVES" dataKey="competenceAdministrative" width={200} />
                                <Column label="COMPÉTENCES NUMÉRIQUES / SCOLAIRES" dataKey="competenceSolaris" width={200} />
                                <Column label="GLOBAL ACCESS" dataKey="globalAccess" width={200} />
                                <Column label="GLOBAL COMPETENCE" dataKey="globalCompetence" width={200} />
                            </Table>
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </div>
    </div>
    )
}
export default VirtualTable;