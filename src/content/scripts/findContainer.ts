import jquery from 'jquery';

export const findContainer = () =>
    jquery(
        '#resultsContainer .change-container .change-attachments .caseAttachmentList .attachmentRow.attachment-item'
    );
