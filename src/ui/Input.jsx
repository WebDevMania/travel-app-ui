import React from 'react'

const Input = ({
    type,
    placeholder,
    register,
    className,
    id = undefined,
    step = undefined
}) => {
    const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"

    return (
        <>
            <input
                className={className ? className : defaultClassName}
                type={type}
                placeholder={placeholder}
                step={step}
                id={id}
                {...register}
            />
        </>
    )
}

export default Input