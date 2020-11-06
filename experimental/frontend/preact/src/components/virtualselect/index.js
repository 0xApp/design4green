
import React, { useState } from 'react';
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select';

const Option = ({
    style,
    option,
    selectValue,
}) => {
    return (
        <a
            style={{ width: '500px' }}
            onClick={() => selectValue(option)}
        >
            {option.value}
        </a>
    );
};

const VirtualSelect = ({ onSelectChange, name, options }) => {

    const styles = {
        width: '200px'
    };
    const [region, setRegion] = useState('');

    return (
        <div style={{ width: '200px' }}>
            <VirtualizedSelect
                options={options}
                value={''}
                id={name}
                placeholder="Search"
                style={styles}
                value={region}
                onChange={(region) => { setRegion(region); onSelectChange(region, name); }}

            //style={styles}
            /></div>

    )

}
export default VirtualSelect;