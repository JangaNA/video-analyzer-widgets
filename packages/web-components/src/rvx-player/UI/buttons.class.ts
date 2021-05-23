import { setElementTooltip } from '../../../../common/utils/elements';
import {
    ARROW_LEFT_PATH,
    ARROW_RIGHT_PATH,
    FORWARD_SVG_PATH,
    FULL_OFF_PATH,
    FULL_PATH,
    METADATA_PATH,
    MUTE_PATH,
    ON_PATH,
    OVERFLOW_MENU_PATH,
    REWIND_SVG_PATH,
    SKIP_NEXT_PATH,
    SKIP_PREV_PATH
} from '../../../../styles/svg/svg.shapes';
import { ControlPanelElementsTooltip } from '../rvx-player.definitions';

/* eslint-disable @typescript-eslint/no-explicit-any */
const shaka = require('shaka-player/dist/shaka-player.ui.debug.js');

export class PlayButton extends shaka.ui.PlayButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;
    private readonly PATH_PLAY = 'm4 1.336 10.664 6.664-10.664 6.664zm1.336 2.406v8.516l6.813-4.258z';
    private readonly PATH_PAUSE = 'M10 2h1.5v12h-1.5v-12zM4.5 14v-12h1.5v12h-1.5z';
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon() {
        if (this.isPaused()) {
            this.path.setAttribute('d', this.PATH_PLAY);
            setElementTooltip(this.button, ControlPanelElementsTooltip.PLAY);
        } else {
            this.path.setAttribute('d', this.PATH_PAUSE);
            setElementTooltip(this.button, ControlPanelElementsTooltip.PAUSE);
        }
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.button.appendChild(this.svg);
        this.updateIcon();
        setElementTooltip(this.button, ControlPanelElementsTooltip.PLAY);
    }
}

export class ForwardButton extends shaka.ui.FastForwardButton {
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', FORWARD_SVG_PATH);
        this.svg.appendChild(this.path);
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.FAST_FORWARD);
    }
}

export class RewindButton extends shaka.ui.RewindButton {
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', REWIND_SVG_PATH);
        this.svg.appendChild(this.path);
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.REWIND);
    }
}

export class FullscreenButton extends shaka.ui.FullscreenButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        if (document.fullscreenElement) {
            this.path.setAttribute('d', FULL_PATH);
            setElementTooltip(this.button_, ControlPanelElementsTooltip.FULLSCREEN);
        } else {
            this.path.setAttribute('d', FULL_OFF_PATH);
            setElementTooltip(this.button_, ControlPanelElementsTooltip.EXIT_FULLSCREEN);
        }
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.updateIcon_();
        setElementTooltip(this.button_, ControlPanelElementsTooltip.FULLSCREEN);
    }
}

export class MuteButton extends shaka.ui.MuteButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        if (!this.svg) {
            return;
        }
        const path = this.ad ? (this.ad.isMuted() ? MUTE_PATH : ON_PATH) : this.video.muted ? MUTE_PATH : ON_PATH;
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        this.path.setAttribute('d', path);
        if (this.ad?.isMuted() || this.video?.muted) {
            setElementTooltip(this.button_, ControlPanelElementsTooltip.UNMUTE);
        } else {
            setElementTooltip(this.button_, ControlPanelElementsTooltip.MUTE);
        }
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.updateIcon_();
        setElementTooltip(this.button_, ControlPanelElementsTooltip.MUTE);
    }
}

export class OverflowMenu extends shaka.ui.OverflowMenu {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public createChildren_() {
        super.createChildren_();
        const settingsLabel = document.createElement('label');
        settingsLabel.classList.add('settings-header');
        const settingsSpan = document.createElement('span');
        settingsSpan.innerText = 'Settings';
        settingsLabel.prepend(settingsSpan);
        this.overflowMenu_.prepend(settingsLabel);
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', OVERFLOW_MENU_PATH);
        this.svg.appendChild(this.path);
        this.overflowMenuButton_.innerText = '';
        this.overflowMenuButton_.appendChild(this.svg);
        setElementTooltip(this.overflowMenuButton_, ControlPanelElementsTooltip.OVERFLOW_MENU);

        const backToButtons = this.controls.getVideoContainer().getElementsByClassName('shaka-back-to-overflow-button');
        for (const button of backToButtons) {
            const icon = button.querySelector('.material-icons-round');
            if (icon) {
                button.removeChild(icon);
            }
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'black');
            path.setAttribute('d', ARROW_LEFT_PATH);
            svg.appendChild(path);
            button.prepend(svg);
        }
    }
}

export class LiveButton extends shaka.ui.Element {
    public isLiveButton = true;
    private isLive = true;
    public constructor(parent: any, controls: any, private callBack: (isLive: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    public updateLiveState(isLive: boolean) {
        this.isLive = isLive;
        this.button_.classList.add(this.isLive ? 'live-on' : 'live-off');
        this.button_.classList.remove(this.isLive ? 'live-off' : 'live-on');
        const label = this.isLive ? 'Switch to VOD' : 'Switch to live';
        this.button_.setAttribute('title', label);
        this.button_.setAttribute('aria-label', label);
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.innerHTML = '<b>LIVE</b>';
        this.button_.classList.add('live-button-component');
        this.parent.appendChild(this.button_);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.LIVE);

        this.eventManager.listen(this.button_, 'click', () => {
            this.isLive = !this.isLive;
            this.callBack(this.isLive);
        });
    }
}

export class NextDayButton extends shaka.ui.Element {
    public constructor(parent: any, controls: any, private callBack: () => void) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.setAttribute('title', 'Next recorded day');
        this.button_.setAttribute('aria-label', 'Next recorded day');

        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.path.setAttribute('d', ARROW_RIGHT_PATH);
        this.button_.classList.add('next-day-button');
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.NEXT_DAY);
        this.eventManager.listen(this.button_, 'click', () => {
            this.callBack();
        });
    }
}

export class PrevDayButton extends shaka.ui.Element {
    public constructor(parent: any, controls: any, private callBack: () => void) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.setAttribute('title', 'Previous recorded day');
        this.button_.setAttribute('aria-label', 'Previous recorded day');
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.path.setAttribute('d', ARROW_LEFT_PATH);
        this.button_.classList.add('prev-day-button');
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.PREVIOUS_DAY);
        this.eventManager.listen(this.button_, 'click', () => {
            this.callBack();
        });
    }
}

export class HoursLabel extends shaka.ui.Element {
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('span');
        this.button_.innerHTML = '24 hours';
        this.button_.classList.add('hours-label');
        this.parent.appendChild(this.button_);
        setElementTooltip(this.button_, ControlPanelElementsTooltip.HOURS_LABEL);
    }
}

export class BodyTracking extends shaka.ui.Element {
    private isOn = false;

    public constructor(parent: any, controls: any, private callBack: (isOn: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        if (this.isOn) {
            this.button_.classList.add('body-tracking-on');
            setElementTooltip(this.button_, ControlPanelElementsTooltip.BODY_TRACKING_OFF);
        } else {
            this.button_.classList.remove('body-tracking-on');
            setElementTooltip(this.button_, ControlPanelElementsTooltip.BODY_TRACKING_ON);
        }
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.path.setAttribute('d', METADATA_PATH);
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        this.updateIcon_();
        setElementTooltip(this.button_, ControlPanelElementsTooltip.BODY_TRACKING_ON);
        this.eventManager.listen(this.button_, 'click', () => {
            this.isOn = !this.isOn;
            this.updateIcon_();
            this.callBack(this.isOn);
        });
    }
}

export class NextSegment extends shaka.ui.Element {
    public constructor(parent: any, controls: any, private callBack: (isNext: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.setAttribute('title', 'Next time range');
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.button_.classList.add('next-segment-button');
        this.path.setAttribute('d', SKIP_NEXT_PATH);
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        this.eventManager.listen(this.button_, 'click', () => {
            this.callBack(true);
        });
    }
}

export class PrevSegment extends shaka.ui.Element {
    public constructor(parent: any, controls: any, private callBack: (isNext: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.setAttribute('title', 'Previous time range');
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.button_.classList.add('prev-segment-button');
        this.path.setAttribute('d', SKIP_PREV_PATH);
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        this.eventManager.listen(this.button_, 'click', () => {
            this.callBack(false);
        });
    }
}
