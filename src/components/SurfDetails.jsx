import React from 'react';

function SurfDetails(){
    return fetch(`https://www.ndbc.noaa.gov/data/realtime2/46029.spec`).then(
      response => response.text(),
      error => console.log('An error occured', error))
      .then ((response)=> {
        console.log('response', response);
      });

    return(
        <div>
            <h1> The surf response: {response}</h1>
        </div>
    );
}

export default SurfDetails;