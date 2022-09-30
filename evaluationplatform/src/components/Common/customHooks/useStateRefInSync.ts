import { useState, useRef } from 'react'

const useStateRefInSync = (val: any) => {
    const [value, setValue] = useState(val)
    const valRef = useRef(val);
    const modSetValue = (newValue: any) => {
        setValue(newValue);
        valRef.current = newValue
    }
    return [value, modSetValue, valRef]
}

export default useStateRefInSync