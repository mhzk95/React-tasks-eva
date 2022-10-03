import React, { useState } from 'react'
import Observer from '@researchgate/react-intersection-observer'
// import { useInView } from 'react-intersection-observer'



const ReactObserver = () => {

    const [view , setView] = useState(false)
  
    const checkTarget = (event,unobserve,entry) => {
        console.log(entry);
        console.log(event.isIntersecting)
        if(event.isIntersecting) unobserve();
        setView(event.isIntersecting)
    }

    // const {ref,inView} = useInView({
    //     threshold:1
    // })

    const options = {
        onChange: checkTarget,
        rootMargin: '100px'
    }

    return (
        <div id="observer-container" className='observer_container'>
            <Observer {...options}>
                <div className='content_wrapper'>
                    <span className='content'>Hello World : {view.toString()}</span>
                 <img src={ view ? 'https://picsum.photos/200' : ''} /> 
                </div>
            </Observer>

            <Observer {...options}>
                
            </Observer>
        </div>
    )
}

export default ReactObserver