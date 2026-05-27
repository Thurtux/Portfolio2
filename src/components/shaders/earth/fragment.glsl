precision highp float;

uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform sampler2D uBumpTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    
    // Apply bump mapping
    vec3 bumpNormal = normal;
    vec2 bumpValue = texture2D(uBumpTexture, vUv).rg * 2.0 - 1.0;
    bumpNormal = normalize(normal + vec3(bumpValue.x, bumpValue.y, 0.0) * 0.05);
    
    vec3 color = vec3(0.0);

    // Sun orientation with bump mapping
    float sunOrientation = dot(uSunDirection, bumpNormal);

    // Day / night color with enhanced transition
    float dayMix = smoothstep(-0.2, 0.3, sunOrientation);
    vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
    vec3 nightColor = texture2D(uNightTexture, vUv).rgb * 1.2; // Brighten night lights
    color = mix(nightColor, dayColor, dayMix);

    // Enhanced cloud system
    vec2 specularCloudsColor = texture2D(uSpecularCloudsTexture, vUv).rg;
    float cloudsMix = smoothstep(0.4, 1.0, specularCloudsColor.g);
    cloudsMix *= dayMix;
    vec3 cloudColor = mix(vec3(0.8), vec3(1.0), specularCloudsColor.r);
    color = mix(color, cloudColor, cloudsMix * 0.8);

    // Enhanced Fresnel effect
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    // Atmosphere with enhanced colors
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix * 0.3);

    // Enhanced specular highlights
    vec3 reflection = reflect(-uSunDirection, bumpNormal);
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 32.0);
    specular *= specularCloudsColor.r;

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor * 0.5;

    // Final color adjustment
    color = pow(color, vec3(0.9)); // Slight gamma correction for better contrast

    gl_FragColor = vec4(color, 1.0);
}