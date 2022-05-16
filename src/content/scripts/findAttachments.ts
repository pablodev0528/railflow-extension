import jquery from 'jquery';

export const findAttachments = () =>
    jquery(
        '#resultsContainer .change-container .change-attachments #caseAttachmentList .attachmentRow.attachment-item'
    );
