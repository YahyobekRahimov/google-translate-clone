import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MultilineField from '../MultilineTextField/MultilineField';


export default function CustomTabPanel(props) {
  const {textFieldsDisabled, filled, toLang, setToLang} = props;
  const handleChangeToLang = (event, newValue) => {
    setToLang(newValue);
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={toLang}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeToLang} aria-label="lab API tabs example">
            <Tab label="Uzbek" value="uz" />
            <Tab label="English" value="en" />
            <Tab label="Russian" value="ru" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MultilineField disabled={textFieldsDisabled} filled={filled} />
        </TabPanel>
        <TabPanel value="2">
          <MultilineField disabled={textFieldsDisabled} filled={filled} />
        </TabPanel>
        <TabPanel value="3">
          <MultilineField disabled={textFieldsDisabled} filled={filled} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
