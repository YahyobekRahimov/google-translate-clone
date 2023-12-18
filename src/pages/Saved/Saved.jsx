import './Saved.scss';

export default function Saved() {
  function getSavedTranslations() {
    const data = JSON.parse(localStorage.getItem('saved'));
    if (!data) {
      return null;
    } else {
      return data.map((element, index) => {
        return (
          <li key={index}>
            <span className='flag'>{element.flag}</span>
            <p className='original-text'>{element.original_text}</p>
            <p className='translated-text'>{element.translation}</p>
          </li>
        )
      });
    }
  }
  let mappedTranslations = getSavedTranslations();

  return (
    <div className="container saved__container">
      <h1>Saved translations</h1>
      <ul className='saved-list'>
        {mappedTranslations}
      </ul>
    </div>
  )
}
