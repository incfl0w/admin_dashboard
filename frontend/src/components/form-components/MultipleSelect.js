import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

  export default function MultipleSelect({data, selectedGroups, setSelectedGroups}) {
    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setSelectedGroups(value)

    };

    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
          <InputLabel shrink htmlFor="select-multiple-native">
            Groups
          </InputLabel>
          <Select
            multiple
            native
            value={selectedGroups}
            onChange={handleChangeMultiple}
            label="Native"
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {data.map((dataItem) => (
              <option key={dataItem.id} value={dataItem.name}>
                {dataItem.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }