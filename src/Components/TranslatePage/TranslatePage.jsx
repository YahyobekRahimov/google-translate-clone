import './TranslatePage.scss';
import * as React from 'react';
import { Container, Stack } from '@mui/material';
import TabPanelFromLang from '../TabPanelFromLang/TabPanelFromLang';
import TabPanelToLang from '../TabPanelToLang/TabPanelToLang';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material"
import { useRef } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const customTheme = (outerTheme) =>
createTheme({
  palette: {
    mode: outerTheme.palette.mode,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#6F7E8C',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:before, &:after': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
          '&.Mui-focused:after': {
            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    }
  },
});

export default function TranslatePage() {
  const outerTheme = useTheme();
  const inputText = useRef();
  const outputText = useRef();
  let [fromLang, setFromLang] = React.useState('en');
  let [toLang, setToLang] = React.useState('uz');
  const [previousLang, setPreviousLang] = React.useState({
    previousFromLang: 'en',
    previousToLang: 'uz'
  })

  async function handleTranslateClick() {
    let data = '';
    const url = 'https://free-google-translation.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9d72c1438cmsh51e4b2b9abea0eep18338bjsn48414eff16fc',
        'X-RapidAPI-Host': 'free-google-translation.p.rapidapi.com'
      },
      body: JSON.stringify({
        texte: inputText.current.value,
        to_lang: toLang
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      data = result;
    } catch (error) {
      console.error(error);
    }
    console.log(data);
    outputText.current.value = data.translation_data.translation;
  }
  // React.useEffect(() => {
  //   console.log('UI change');
  // })  
  // React.useEffect(() => {
  // }, [fromLang, toLang])

  // React.useEffect(() => {
  //   if (fromLang === toLang) {
  //     setToLang(previousLang.previousToLang);
  //     console.log(previousLang.previousToLang);
  //   }
  //   setPreviousLang({
  //     ...previousLang,
  //     previousFromLang: fromLang,
  //   })
  //   console.log(previousLang)
  //    }, [fromLang])

  // React.useEffect(() => {
  //   if (fromLang === toLang) {
  //     setFromLang(previousLang.previousFromLang);
  //     console.log(previousLang.previousFromLang);
  //   }
  //   setPreviousLang({
  //     ...previousLang,
  //     previousToLang: toLang
  //   })
  //   console.log(previousLa)
  //   }, [toLang])

  return (
    <Container maxWidth="xl">
        <div className="text-fields-wrapper">
          <Stack spacing={2}>
            <TabPanelFromLang
              fromLang={fromLang}
              setFromLang={setFromLang}
             />
            <TextField 
              inputRef={inputText}
              disabled={false} 
              margin="none" 
              className="multiline-text-field" 
              size="normal" 
              minRows={3} 
              id="inputText" 
              variant='outlined' 
              multiline
               />
          </Stack>
          <Stack spacing={2}>
            <TabPanelToLang
              toLang={toLang}
              setToLang={setToLang}
             />
             <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField 
                inputRef={outputText}
                disabled={true} 
                margin="none" 
                className="multiline-text-field" 
                size="normal" 
                minRows={3} 
                id="outputText" 
                variant='filled' 
                multiline />
             </ThemeProvider>
          </Stack>
        </div>
        <Button
          className='translate-button'
          onClick={handleTranslateClick}
          size='large'
          variant='contained'
          >Translate</Button>
    </Container>
  )
}
