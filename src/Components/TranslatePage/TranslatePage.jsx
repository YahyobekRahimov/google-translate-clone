import './TranslatePage.scss';
import * as React from 'react';
import { Container, Stack } from '@mui/material';
import TabPanelFromLang from '../TabPanelFromLang/TabPanelFromLang';
import TabPanelToLang from '../TabPanelToLang/TabPanelToLang';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material"
import { useRef } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import Switch from '../Switch/Switch';
import Tabs from '../Tabs/Tabs';
import TextArea from '../TextArea/TextArea';

const languages = [
  {
    language: 'English',
    abbreviation: 'en'
  },
  {
    language: 'Uzbek',
    abbreviation: 'uz'
  },
  {
    language: 'Russian',
    abbreviation: 'ru'
  },
  {
    language: 'Spanish',
    abbreviation: 'es'
  },
  {
    language: 'French',
    abbreviation: 'fr'
  },
  {
    language: 'German',
    abbreviation: 'de'
  },
  {
    language: 'Chinese',
    abbreviation: 'zh'
  },
  {
    language: 'Japanese',
    abbreviation: 'ja'
  },
  {
    language: 'Korean',
    abbreviation: 'ko'
  },
  {
    language: 'Arabic',
    abbreviation: 'ar'
  },
  {
    language: 'Portuguese',
    abbreviation: 'pt'
  },
  {
    language: 'Italian',
    abbreviation: 'it'
  },
  {
    language: 'Dutch',
    abbreviation: 'nl'
  },
  {
    language: 'Swedish',
    abbreviation: 'sv'
  },
  {
    language: 'Turkish',
    abbreviation: 'tr'
  },
];


export default function TranslatePage() {
  const [selectedTab, setSelectedTab] = React.useState('auto');
  const [selectedTranslationTab, setSelectedTranslationTab] = React.useState('uz');
  function handleTabClick(index) {
    setSelectedTab(index)
  }
  function handleTabClickSecond(index) {
    setSelectedTranslationTab(index);
  }
  
  const tabs = languages.map((language, index) => {
    const abbreviation = language.abbreviation;
    return <li 
      className={selectedTab == abbreviation ? 'tab selected-tab' : 'tab'}
      onClick={() => handleTabClick(abbreviation)}  
      key={index}  
      value={abbreviation}
    >{language.language}</li>
  })
  
  const tabsSecond = languages.map((language, index) => {
    const abbreviation = language.abbreviation;
    return (
      <li 
    className={selectedTranslationTab == abbreviation ? 'tab selected-tab' : 'tab'}
    onClick={() => handleTabClickSecond(abbreviation)}  
    key={index}  
    value={abbreviation}
  >{language.language}</li>)
  });
  const detectLanguageItem = [
  <li 
    value='auto'
    key='auto'
    className={selectedTab == 'auto' ? 'tab selected-tab' : 'tab'}
    onClick={() => handleTabClick('auto')}
  >Detect Language</li>
];
  
  const inputText = useRef();
  const outputText = useRef();
  const [isCopied, setIsCopied] = React.useState(false);

  async function handleTranslateClick() {
    if (!inputText.current.value) {
      alert('You must write something to be translated')
      return;
    }
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
        to_lang: selectedTranslationTab
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
  function handleCopyClick() {
    if (!outputText.current.value) {
      alert('There is nothing translated')
      return;
    } 
    setIsCopied(true);
    navigator.clipboard.writeText(outputText.current.value)
    setTimeout(() => {
      setIsCopied(false);
    }, 1500)
  }
  return (
    <>
      <header>
        <Container maxWidth='lg'>
          <Switch />
        </Container>
      </header>
      <Container maxWidth="lg">
          <div className="text-fields-wrapper">
            <Stack spacing={2}>
              <Tabs 
                tabs={[...detectLanguageItem, ...tabs]}
              />
              <TextArea
                inputRef={inputText}
                classes='multiline-text-field'
                id={inputText}
                placeholder = 'Hello world!'
               />
            </Stack>
            <Stack spacing={2}>
              <Tabs 
                tabs={[...tabsSecond]}
                />
                <TextArea
                  inputRef = {outputText}
                  disabled = {true}
                  id={outputText}
                  classes = 'multiline-text-field translatedText'
                  placeholder = 'Translation'
                 />
                  <MdOutlineContentCopy className={isCopied ? 'copy-button copy copy-opacity' : 'copy-button'} onClick={handleCopyClick} />
            </Stack>  
          </div>
          <Button
            className='translate-button'
            onClick={handleTranslateClick}
            size='large'
            variant='contained'
            >Translate</Button>
      </Container>
    </>
  )
}
