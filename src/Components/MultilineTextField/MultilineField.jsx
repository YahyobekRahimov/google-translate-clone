import { TextField } from "@mui/material"
import './MultilineField.scss';

export default function MultilineField(props) {
    const {disabled, filled} = props;
  return (
    <TextField disabled={disabled} margin="none" className="multiline-text-field" size="normal" minRows={3} id="outlined-basic" variant={filled ? 'filled' : 'outlined'} multiline />
  )
}
