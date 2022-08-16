// DONE: 用來 export shader

export const vertexShader = () => {
    return `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;
};

export const fragmentShaderTopTexture = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureT;

        varying vec2 vUv;

        void main(void) {
            vec4 color0 = texture2D(textureT, vUv);
            gl_FragColor = color0;
        }
    `;
};

export const fragmentShaderTop = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureT;
        uniform sampler2D textureText;

        varying vec2 vUv;

        void main(void) {
            vec4 color0 = texture2D(textureT, vUv);
            vec4 color1 = texture2D(textureText, vUv);
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader0 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader1 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float none_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vUv);
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - none_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader2 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + circ_time, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader3 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader4 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y + circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y + circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y - circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader5 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y - circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader6 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        uniform float animate;

        void main(void) {         
            if (animate == 1.0) {
                vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
                vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
                gl_FragColor = mix(color0, color1, color1.a);
            }
            
            if (animate == 2.0) {
                vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
                vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + circ_time));
                gl_FragColor = mix(color0, color1, color1.a);
            }
        }
    `;
};

export const fragmentShader7 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;

        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + circ_time, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader8 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;

        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader9 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        uniform float animate;

        void main(void) {
            if (animate == 1.0) {
                vec4 color0 = texture2D(textureA, vUv);
                vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y + (1.0 - circ_time) * 0.25));
                vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
            
            if (animate == 2.0) {
                vec4 color0 = texture2D(textureA, vUv);
                vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y + circ_time * 0.25));
                vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
            }
        }
    `;
};

export const fragmentShader10 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float power3_time;
        uniform float power4_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - power3_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - power4_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + circ_time - 0.25, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a * sin(radians(circ_time * 180.0)));
        }
    `;
};

export const fragmentShader11 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y + circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader12 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float elastic_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + elastic_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader13 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float elastic_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y + circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader14 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float power3_time;
        uniform float power4_time;
        uniform float elastic_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + power3_time, vUv.y - power3_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + power4_time, vUv.y - power4_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - elastic_time, vUv.y + elastic_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader15 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader16 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float power2_time;
        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + power3_time, vUv.y - power3_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + power2_time, vUv.y - power2_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + power2_time, vUv.y - power2_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader17 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float power2_time;
        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - power2_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - power3_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + power2_time, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader18 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader19 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vUv);
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + circ_time - 0.25, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a * sin(radians(circ_time * 180.0)));
        }
    `;
};

export const fragmentShader20 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time * 0.5, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader21 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        uniform sampler2D textureD;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float circ_in_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y + circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vUv);
            
            vec4 color3 = texture2D(textureD, vec2((vUv.x / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0) * circ_in_time + (1.0 - circ_in_time)/2.0, (vUv.y / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0)) * circ_in_time + (1.0 - circ_in_time)/2.0);
            
            // vec4 color3 = texture2D(textureD, vec2((vUv.x / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0) * circ_in_time + (1.0 - circ_in_time)/2.0, (vUv.y / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0)) * circ_in_time + (1.0 - circ_in_time)/2.0);

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `;
};

export const fragmentShader22 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader23 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y + circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y - circ_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader24 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        uniform sampler2D textureD;

        varying vec2 vUv;

        uniform float power3_time;
        uniform float elastic_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - power3_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + power3_time, vUv.y - power3_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - power3_time, vUv.y - power3_time));
            
            vec4 color3 = texture2D(textureD, vec2(vUv.x, vUv.y - elastic_time));

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `;
};

export const fragmentShader25 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - power3_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + power3_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader27 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + circ_time, vUv.y + circ_time));
            gl_FragColor = color0;
        }
    `;
};

export const fragmentShader28 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y));
            vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
            gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
        }
    `;
};

export const fragmentShader30 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `;
};

export const fragmentShader31 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        
        varying vec2 vUv;

        uniform float power2_time;
        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - power3_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - power2_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + power3_time));

            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader32 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        
        varying vec2 vUv;

        uniform float power2_time;
        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - power2_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y + power3_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + power2_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `;
};

export const fragmentShader34 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        uniform sampler2D textureD;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x + circ_time, vUv.y));
            vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y + circ_time));
            
            vec4 color3 = texture2D(textureD, vec2(vUv.x - circ_time, vUv.y));

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `;
};

export const fragmentShader35 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;
        uniform sampler2D textureD;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureB, vec2(vUv.x + circ_time, vUv.y - circ_time));
            vec4 color2 = texture2D(textureC, vec2(vUv.x + circ_time, vUv.y + circ_time));
            
            vec4 color3 = texture2D(textureD, vec2(vUv.x + circ_time, vUv.y + circ_time));

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `;
};

export const fragmentShader37 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureA;
        uniform sampler2D textureB;
        uniform sampler2D textureC;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float elastic_time;
        uniform float elastic_drastic_time;

        uniform float animate;
        
        void main(void) {
            if (animate == 1.0) {
                vec4 color0 = texture2D(textureA, vec2(vUv.x, vUv.y - elastic_drastic_time));
                vec4 color1 = texture2D(textureB, vec2(vUv.x, vUv.y - elastic_time));
                vec4 color2 = texture2D(textureC, vec2(vUv.x, vUv.y - elastic_drastic_time));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
            
            if (animate == 2.0) {
                vec4 color0 = texture2D(textureA, vec2(vUv.x - circ_time, vUv.y));
                vec4 color1 = texture2D(textureB, vec2(vUv.x - circ_time, vUv.y));
                vec4 color2 = texture2D(textureC, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
        }
    `;
};
