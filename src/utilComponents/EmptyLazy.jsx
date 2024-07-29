import { lazy, useEffect } from "react"

const EmptyLazy = ({OnLoaded}) => {
  useEffect(() => OnLoaded(),[]);
  return <> </>;
}


export default EmptyLazy;