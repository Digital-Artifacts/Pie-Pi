import axios from "axios";

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

const saveToIPFS = async (file: File): Promise<string | null> => {
    
    try {
        
        // Create a new multipart form data
        const formData = new FormData();

        // add file to the form data
        formData.append("file", file)

        const metadata = JSON.stringify({
            name: "File name",
        })
        formData.append('pinataMetadata', metadata);
    
        const options = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', options);

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity,
            headers: {
            'Authorization': `Bearer ${PINATA_JWT}`
        }
        });
        return (res.data.IpfsHash);
    } catch (error) {
        console.error("Error saving file to IPFS:", error);
        return null;
    }  
};
   
export default saveToIPFS;