import jQuery from 'jquery';

const imageCheckRegex = new RegExp('.(gif|jpe?g|tiff?|png|webp|bmp)$', 'i');

/**
 * Check Attachment File is Image or not
 *
 * @param el
 * @returns
 */
export const checkImgAttachment = (el: HTMLElement) => {
    const linkEl = jQuery(el).find('.attachment-summary .attachment-title a');

    return imageCheckRegex.test(linkEl?.get(0)?.innerHTML ?? '');
};
