/**
 * Convert Blob file type to Base64 string
 *
 * @param blob
 * @returns
 */
export const blobToBase64 = (blob: Blob | Blob[]): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader?.result as string) ?? '');
        reader.readAsDataURL(blob as any);
    });
};
