import { runtime } from 'webextension-polyfill';
import jquery from 'jquery';

import { setupPreviewModals } from './setupPreviewModals';

import MessageListener from './messageListener';

// setup event listener
runtime.onMessage.addListener(MessageListener);

jquery(() => {
    setupPreviewModals();
});
