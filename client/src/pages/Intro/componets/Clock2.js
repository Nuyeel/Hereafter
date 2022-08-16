import React from 'react';
import './clock2.scss';
function Clock() {
    return (
        <div className="yun-clock-container">
            <div className="clockbody">
                <div class="cosmos">
                    <div class="galaxy">
                        <div class="box">
                            <div class="planet">
                                <div className="hours"></div>
                            </div>
                            {/* <div class="orbit"></div> */}
                        </div>
                        <div class="box">
                            <div className="planet">
                                <div className="minutes"></div>
                            </div>

                            {/* <div class="orbit"></div> */}
                        </div>
                        <div class="box">
                            <div className="planet">
                                <div className="seconds"></div>
                            </div>

                            {/* <div class="orbit"></div> */}
                        </div>
                        <div class="box">
                            <div className="planet">
                                <div className="miliseconds"></div>
                            </div>
                            <div class="orbit"></div>
                        </div>
                     
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default Clock;
