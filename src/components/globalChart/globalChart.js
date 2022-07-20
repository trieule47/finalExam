import React from 'react';
function iframe() {
    return {
        __html: '<iframe src="./globalChart.html" width="540" height="450"></iframe>'
    }
}
var htmlContent = require('./globalChart.html');


export default function GlobalChart() {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent}} />
            hi
        </div>)
}