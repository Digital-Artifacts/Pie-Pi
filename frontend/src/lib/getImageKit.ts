/**
 * @param url - URL to be converted to imagekit url
 * @param name - transformation name
 * @returns ImageKit Url
 */

const IMAGEKIT_ID = process.env.NEXT_PUBLIC_IMAGEKIT_ID || ''

const imagekitURL = (url: string, name?: string, blur?: string): string => {
    const IMAGEKIT_URL = 'https://ik.imagekit.io/' + IMAGEKIT_ID + '/ipfs'
    
    return `${IMAGEKIT_URL}/tr:w-30,h-30/${url}`;
};

export default imagekitURL