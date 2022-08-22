import { useRef, useState, forwardRef, useEffect } from 'react';

function InputIME(props, ref) {
    const {
        onChange,
        value,
        passcodePrevious,
        passwordPrevious,
        confirmPasswordPrevious,
        setPasscodePrevious,
        setPasswordPrevious,
        setConfirmPasswordPrevious,
        isAutoFill,
        ...otherProps
    } = props;
    // console.log(otherProps);

    // log if on composition
    const onComposition = useRef(false);
    // temp input
    const [inputValue, setInputValue] = useState('');

    const _onChange = (event) => {
        if (otherProps.name === 'passcode') {
            setPasscodePrevious(event.target.value);
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

    useEffect(() => {
        if (isAutoFill && otherProps.name === 'passcode') {
            setInputValue(passcodePrevious);
        }
    }, [isAutoFill]);

    useEffect(() => {
        if (isAutoFill && otherProps.name === 'password') {
            setInputValue(passwordPrevious);
        }
    }, [isAutoFill]);

    useEffect(() => {
        if (isAutoFill && otherProps.name === 'confirmPassword') {
            setInputValue(confirmPasswordPrevious);
        }
    }, [isAutoFill]);

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
