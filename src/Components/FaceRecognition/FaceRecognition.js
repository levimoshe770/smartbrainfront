import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (params) =>
{
    console.log(params.box);
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={params.imageUrl} width='750px' height='auto'/>
                <div className='bounding-box' style={{top: params.box.topRow, right: params.box.rightCol, bottom: params.box.bottomRow, left: params.box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;