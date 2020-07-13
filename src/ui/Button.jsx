import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from './Loader'

export function Button({children, type='primary', loading= false, ...props}) {
    let className = 'btn'
    let htmlType = null
    if (type === 'submit') {
        htmlType = 'submit'
        className += ' btn-primary'
    }
    else {
        className += ' btn-' + type
    }
    return <button className={className} type={htmlType} {...props}>
        {loading ? <> <Loader/> Chargement </>: children}
    </button>
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    loading: PropTypes.bool
}