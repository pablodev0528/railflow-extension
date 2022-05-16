import React from 'react';
import ReactDOM from 'react-dom/client';
import _ from 'lodash';

import PreviewModal from './components/PreviewModal';

import { findAttachments } from './scripts/findAttachments';

export const setupPreviewModals = () => {
    const containers = findAttachments();
    console.log('containers', containers);
    containers.each((index, el) => {
        const rootElement = document.createElement('div');
        rootElement.id = _.uniqueId();
        el.appendChild(rootElement);

        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <PreviewModal el={el} />
            </React.StrictMode>
        );
    });
};

export default setupPreviewModals;
