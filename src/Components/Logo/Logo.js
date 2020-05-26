import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
 
const Logo = () =>
{
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner"> 
                    <img style={{paddingTop: '80px'}} src="https://img.icons8.com/cotton/64/000000/brain-3.png" alt='brain'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;