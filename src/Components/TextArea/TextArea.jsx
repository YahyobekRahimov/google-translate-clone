import './TextArea.scss';

export default function TextArea({disabled, placeholder, inputRef, classes, id}) {
  return (
    <div className='TextArea-wrapper'>
        <textarea
            className={classes}
            name=""
            id={id}
            cols="30"
            rows="5"
            ref={inputRef}
            placeholder={placeholder}
            disabled = {disabled}
        ></textarea>
    </div>
  )
}
