import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';

import _ from 'lodash';
import jquery from 'jquery';
import heic2any from 'heic2any';

import { checkImgAttachment } from 'content/scripts/checkImageAttachment';
import { getImageUrl } from 'content/scripts/getImageUrl';
import { blobToBase64 } from 'content/scripts/blobToBase64';

export type PreviewModalProps = {
    el: HTMLElement;
};

const PreviewModal = ({ el }: PreviewModalProps) => {
    const id = _.uniqueId();
    const [isOpen, setOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>();

    useEffect(() => {
        const res = checkImgAttachment(el);
        if (!res.isImage) {
            return;
        }

        const imageUrl = getImageUrl(el);
        if (!imageUrl) {
            return;
        }

        if (res.ext === 'heic') {
            axios
                .get(getImageUrl(el)!, { withCredentials: true, responseType: 'blob' })
                .then(async (res) => {
                    const blobImage = await heic2any({ blob: res.data, toType: 'image/jpg' });
                    const jpgImage = await blobToBase64(blobImage);
                    console.log(jpgImage);
                    setImgUrl(jpgImage);
                })
                .catch((err) => {
                    console.log('cannot load image', err);
                });
        } else {
            setImgUrl(getImageUrl(el));
        }

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

    if (!imgUrl) {
        return null;
    }

    return (
        <Popper id={id} open={isOpen} anchorEl={el} placement={'top-start'}>
            <Paper
                elevation={8}
                sx={{
                    padding: '3px',
                }}
            >
                <img src={imgUrl} style={{ height: '300px' }}></img>
            </Paper>
        </Popper>
    );
};

export default PreviewModal;
