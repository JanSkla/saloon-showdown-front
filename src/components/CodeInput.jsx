import { useEffect, useState } from "react";

const CodeInput = ({defaultValue = "", onChange = () => {}}) => {
  const [value, setValue] = useState(defaultValue);

  const changeValue = val => {
    setValue(val);
    onChange(val);
  }

  useEffect(() => {
    document.addEventListener('keydown', function(event) {
      changeValue(value + event.key)
  });
  }, [])
  return <>{value}</>
}

export default CodeInput;