import { html } from '@microsoft/fast-element';
import { PlayerComponent } from '.';

/**
 * The template for the example component.
 * @public
 */
export const template = html<PlayerComponent>`
    <template>
        <div class="upper-bounding">
            <span class="col camera-name">${(x) => x.cameraName}</span>
            <div class="date-picker col">
                <span>${(x) => x.time}</span>
                <media-date-picker-component
                    class="date-picker-component"
                    alignRight="${true}"
                    inputDate="${(x) => x.currentDate}"
                    allowedDays="${(x) => x.currentAllowedDays}"
                    allowedMonths="${(x) => x.currentAllowedMonths}"
                    allowedYears="${(x) => x.currentAllowedYears}"
                ></media-date-picker-component>
            </div>
        </div>
        <div shaka-controls="true" class="video-container ${(x) => (x.isLive ? 'live' : 'vod')}">
            <video id="player-video"></video>
        </div>
    </template>
`;
