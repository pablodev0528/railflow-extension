import jQuery from 'jquery';

/**
 * Get Image URL from Attachment Element
 *
 * @param el
 * @returns
 */
export const getImageUrl = (el: HTMLElement) => {
    const linkEl = jQuery(el).find('.attachment-summary .attachment-title a');
    if (!linkEl?.get(0)) {
        return undefined;
    }

    return jQuery(linkEl.get(0)!)?.attr('href');
};
