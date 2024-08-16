import React from 'react'

export default function Error() {
  return (
    <div style={{
        height:'100vh',
        width:'100vw',
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        fontSize:'3vw',
    }}>
        <span>404 页面未找到!</span>
      <a href="/">返回</a>
    </div>
  )
}
