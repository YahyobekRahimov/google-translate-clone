import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MultilineField from '../MultilineTextField/MultilineField';


export default function CustomTabPanel(props) {
  const {textFieldsDisabled, filled, setFromLang, fromLang} = props;
  const handleChangeFromLang = (event, newValue) => {
    setFromLang(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={fromLang}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeFromLang} aria-label="lab API tabs example">
            <Tab label="Detect Language" value="auto" />
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
