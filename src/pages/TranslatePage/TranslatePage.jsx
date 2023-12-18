import './TranslatePage.scss';
import * as React from 'react';
import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import Tabs from '../../Components/Tabs/Tabs';
import TextArea from '../../Components/TextArea/TextArea';
import { languages  } from '../../../data/data';
import Saved from '../../images/saved.svg?react'

export default function TranslatePage() {
  const [selectedTab, setSelectedTab] = React.useState('auto');
  const [selectedTranslationTab, setSelectedTranslationTab] = React.useState('uz');
  const [isLiked, setIsLiked] = React.useState(false);
  const [lastRequest, setLastRequest] = React.useState({});
  function handleTabClick(index) {
    setSelectedTab(index)
  }
  function handleSaveClick() {
   if (!outputText.current.value) {
    alert('You must translate something before you can save it');
    return;
   }
   const saved = JSON.parse(localStorage.getItem('saved')) || [];
   const liked = {
    id: Date.now(),
    flag: lastRequest.flag,
    original_text: lastRequest.translation_data.original_text,
    translation: lastRequest.translation_data.translation
   }
   saved.push(liked);
   localStorage.setItem('saved', JSON.stringify(saved));
    setIsLiked(!isLiked);
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
      setLastRequest(result);
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
                 <div className="icon-wrapper">
                  <MdOutlineContentCopy className={isCopied ? 'copy-button copy copy-opacity' : 'copy-button'} onClick={handleCopyClick} />
                  <Saved 
                    className={isLiked ? 'saved-icon filled clicked' : 'saved-icon'} 
                    onClick={handleSaveClick} />
                 </div>
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
