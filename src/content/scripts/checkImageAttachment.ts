import jQuery from 'jquery';

const imageCheckRegex = new RegExp('.(gif|jpe?g|tiff?|png|webp|bmp|heic)$', 'i');

const videoCheckRegex = new RegExp('.(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg)$', 'i');

/**
 * Check Attachment File is Image or not
 *
 * @param el
 * @returns
 */
export const checkImgAttachment = (el: HTMLElement) => {
    const linkEl = jQuery(el).find('.attachment-summary .attachment-title a');

    const fileName = linkEl?.get(0)?.innerHTML ?? '';

    return {
        isImage: imageCheckRegex.test(fileName),
        ext: imageCheckRegex.exec(fileName)?.[1],
        fileName,
        isVideo: videoCheckRegex.test(fileName),
    };
};
