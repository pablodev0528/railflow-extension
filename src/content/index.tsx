import { runtime, windows } from 'webextension-polyfill';
import jquery from 'jquery';

import { setupPreviewModals } from './setupPreviewModals';

import MessageListener from './messageListener';

console.log('~~~~~~~ loaded content content111', windows);

// setup event listener
runtime.onMessage.addListener(MessageListener);

jquery(() => {
    setupPreviewModals();
});
