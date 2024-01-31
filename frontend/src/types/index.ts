export interface IVideo {
    id: string;
    hash: string;
    title: string;
    description: string;
    location: string;
    category: string;
    thumbnailHash: string;
    isAudio: boolean;
    date: string;
    duration: Number
    livepeerID: string;
    author: string;
    createdAt: BigInt;
}