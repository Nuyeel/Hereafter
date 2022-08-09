import { useRef, useState, forwardRef } from 'react';

function InputIME(props, ref) {
    const {
        onChange,
        value,
        passwordPrevious,
        setAccountPrevious,
        setPasswordPrevious,
        setConfirmPasswordPrevious,
        ...otherProps
    } = props;
    // console.log(otherProps);

    // log if on composition
    const onComposition = useRef(false);
    // temp input
    const [inputValue, setInputValue] = useState('');

    const _onChange = (event) => {
        if (otherProps.name === 'account') {
            setAccountPrevious(event.target.value);
        }
        if (otherProps.name === 'password') {
            setPasswordPrevious(event.target.value);
        }
        if (otherProps.name === 'confirmPassword') {
            setConfirmPasswordPrevious(event.target.value);
        }
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
