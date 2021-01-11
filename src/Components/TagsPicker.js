import React, { useState, useContext } from 'react';
import {
    Typography,
    Checkbox,
    TextField
} from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MyContext from '../MyContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TagsPicker(props) {
    let usersContext = useContext(MyContext);
    let { countriesCodeJson, countries } = usersContext;
    let [value, setValue] = useState(countries);

    let handleComboBoxChange = (event, newValue) => {
        localStorage.setItem('countries', JSON.stringify(newValue));
        setValue(newValue);
    }

    return (
        <div>
            <Typography align='left' id="track-false-range-slider" gutterBottom>
                Countries' Setting
            </Typography>
            <Autocomplete
                fullWidth
                multiple
                id="checkboxes-tags-demo"
                value={value}
                options={countriesCodeJson}
                getOptionSelected={(option, value) => value.Code === option.Code}
                disableCloseOnSelect={true}
                getOptionLabel={(option) => option.Code}
                onChange={handleComboBoxChange}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.Name + ' / ' + option.Code}
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Countries" />
                )}
            />
        </div>
    );
}