import React from 'react';
import './earth.scss';

const Earth = () => {
    return (
        <>
            <div className="yun-earth-container">
                <div className="earthbody">
                    {/* <h1>Earth Animation</h1> */}
                    <div id="earth">
                        <div id="earth-surface">
                            <div id="surface-1" class="surface"></div>
                            <div id="surface-2" class="surface"></div>
                            <div id="surface-3" class="surface"></div>
                            <div id="surface-4" class="surface"></div>
                            <div id="surface-5" class="surface"></div>
                            <div id="surface-6" class="surface"></div>
                            <div id="surface-7" class="surface"></div>
                            <div id="surface-8" class="surface"></div>
                        </div>
                        <div id="earth-surface-end">
                            <div id="surface-end-1" class="surface"></div>
                            <div id="surface-end-2" class="surface"></div>
                            <div id="surface-end-3" class="surface"></div>
                            <div id="surface-end-4" class="surface"></div>
                            <div id="surface-end-5" class="surface"></div>
                            <div id="surface-end-6" class="surface"></div>
                            <div id="surface-end-7" class="surface"></div>
                            <div id="surface-end-8" class="surface"></div>
                        </div>
                        <div id="earth-cloud">
                            <div id="cloud-1" class="cloud"></div>
                            <div id="cloud-2" class="cloud"></div>
                            <div id="cloud-3" class="cloud"></div>
                            <div id="cloud-4" class="cloud"></div>
                            <div id="cloud-5" class="cloud"></div>
                            <div id="cloud-6" class="cloud"></div>
                        </div>
                        <div id="earth-cloud-end">
                            <div id="cloud-end-1" class="cloud"></div>
                            <div id="cloud-end-2" class="cloud"></div>
                            <div id="cloud-end-3" class="cloud"></div>
                            <div id="cloud-end-4" class="cloud"></div>
                        </div>
                        <div id="mask"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Earth;
