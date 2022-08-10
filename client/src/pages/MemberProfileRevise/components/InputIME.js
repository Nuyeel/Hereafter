import { useRef, useState, forwardRef, useEffect } from 'react';

function InputIME(props, ref) {
    const {
        onChange,
        value,
        // namePrevious,
        // birthdatePrevious,
        // deathdatePrevious,
        // emailPrevious,
        // setNamePrevious,
        // setBirthdatePrevious,
        // setDeathdatePrevious,
        // setEmailPrevious,
        ...otherProps
    } = props;
    // console.log(otherProps);

    // log if on composition
    const onComposition = useRef(false);
    // temp input
    const [inputValue, setInputValue] = useState('');

    const _onChange = (event) => {
        // if (otherProps.name === 'name') {
        //     setNamePrevious(event.target.value);
        // }
        // if (otherProps.name === 'birthdate') {
        //     setBirthdatePrevious(event.target.value);
        // }
        // if (otherProps.name === 'deathdate') {
        //     setDeathdatePrevious(event.target.value);
        // }
        // if (otherProps.name === 'email') {
        //     setEmailPrevious(event.target.value);
        // }
        setInputValue(event.target.value);

        // IME method start
        if (event.type === 'compositionstart') {
            onComposition.current = true;
            return;
        }

        // IME method end
        if (event.type === 'compositionend') {
            onComposition.current = false;
        }

        // handle parent onChange
        if (!onComposition.current) {
            onChange(event);
        }
    };

    useEffect(() => {
        setInputValue(value)
    }, [value]);

    console.log(value);

    return (
        <input
            {...otherProps}
            ref={ref}
            value={inputValue}
            onChange={_onChange}
            onCompositionEnd={_onChange}
            onCompositionStart={_onChange}
        />
    );
}

export default forwardRef(InputIME);
