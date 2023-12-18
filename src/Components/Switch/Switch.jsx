import './Switch.scss';
import { useState } from 'react';

export default function Switch() {
    const [themeValue, setThemeValue] = useState('light');
    document.querySelector('body').setAttribute('theme', themeValue)
    function handleThemeClick() {
        if (themeValue == 'light') {
            setThemeValue('dark');
        } else if (themeValue == 'dark') {
            setThemeValue('contrast');
        } else {
            setThemeValue('light');
        }
    }
    let themeClass = 'circle light'
    if (themeValue == 'dark') {
        themeClass = 'circle dark'
    } else if (themeValue == 'contrast') {
        themeClass = 'circle contrast';
    }
  return (
    <div className="theme-switch-wrapper">
        <div className='theme-switch' onClick={handleThemeClick}>
            <div className='theme-numbers'>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
            <div className={themeClass}></div>
        </div>
    </div>
  )
}
