import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

function AlLoadingOverlay({children, text, show}) {
  return (
<LoadingOverlay
            active={show}
            spinner
            styles={{
                overlay: (base) => ({
                    ...base,
                    width: '100vw',
                    height: '100vh',
                    position: "fixed",
                    overflow: 'hidden'
                })
            }}
            text={text}
        >
        {children}
        </LoadingOverlay>
  )
}

export default AlLoadingOverlay