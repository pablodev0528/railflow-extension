import { runtime, Runtime } from 'webextension-polyfill';

/**
 * Define background script functions
 * @type {class}
 */
class Background {
    _port: number;
    constructor() {
        this.init();
    }

    /**
     * Document Ready
     *
     * @returns {void}
     */
    init = () => {
        console.log('[===== Loaded Background Scripts =====]');

        //When extension installed
        runtime.onInstalled.addListener(this.onInstalled);

        //Add message listener in Browser.
        runtime.onMessage.addListener(this.onMessage);
    };

    //TODO: Listeners

    /**
     * Extension Installed
     */
    onInstalled = () => {
        console.log('[===== Installed Extension!] =====');
    };

    /**
     * Message Handler Function
     *
     * @param message
     * @param sender
     * @returns
     */
    onMessage = async (message: EXTMessage, sender: Runtime.MessageSender) => {
        try {
            console.log('[===== Received message =====]', message, sender);
            switch (message.type) {
            }
            return true; // result to reply
        } catch (error) {
            console.log('[===== Error in MessageListener =====]', error);
            return error;
        }
    };

    /**
     * Message from Long Live Connection
     *
     * @param msg
     */
    onMessageFromExtension = (msg: EXTMessage) => {
        console.log('[===== Message from Long Live Connection =====]');
    };
}

export const background = new Background();
