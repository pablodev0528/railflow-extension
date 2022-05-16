import React, { useEffect, useState, useCallback } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import _ from 'lodash';
import jquery from 'jquery';

import { checkImgAttachment } from 'content/scripts/checkImageAttachment';
import { getImageUrl } from 'content/scripts/getImageUrl';

export type PreviewModalProps = {
    el: HTMLElement;
};

const PreviewModal = ({ el }: PreviewModalProps) => {
    const id = _.uniqueId();
    const [isOpen, setOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>();

    useEffect(() => {
        if (!checkImgAttachment(el)) {
            return;
        }

        setImgUrl(getImageUrl(el));

        // Setup mouse over event
        jquery(el).on({
            mouseover: handleMouseOver,
            mouseleave: handleMouseLeave,
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        console.log('mouse leave');
        setOpen(false);
    }, [setOpen]);

    const handleMouseOver = useCallback(() => {
        setOpen(true);
        console.log('mouse hover');
    }, [setOpen]);

    return (
        <Popper id={id} open={isOpen} anchorEl={el} placement={'bottom-start'}>
            <Paper
                elevation={8}
                sx={{
                    padding: '3px',
                }}
            >
                <img src={imgUrl} style={{ width: '200px', height: '200px' }}></img>
            </Paper>
        </Popper>
    );
};

export default PreviewModal;
