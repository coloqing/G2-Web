import React from 'react'
import img from '../../assets/Part/keyBackBorder.png'

export default function PropertyBox(props) {
    return (
        <div style={{
            backgroundImage: 'url(' + img + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            width: '100%',
            height: '80%',
            fontSize: '0.8vw',
            color: '#1adaeb',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>{props.data}</div>
    )
}
