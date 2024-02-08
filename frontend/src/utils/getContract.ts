import { abi } from "../constants/videoPie";
import { Contract_Address } from "../constants/videoPie";
import { ethers } from "ethers";

export default async function getContract() {
    // Creating a new provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contractAddress = "0x7aBE028aaB3980f3a9535Ee4Df9377849b76987D";

    try {
        // Getting the signer
        const signer = await provider.getSigner();

        // Creating a new contract factory with the signer, address, and ABI
        let contract = new ethers.Contract(contractAddress, abi, signer);

        // Returning the contract
        return contract;
    } catch (error) {
        // Handle any errors that might occur during provider or signer interactions
        console.error("Error fetching contract:", error);
        throw error; // Rethrow to allow handling at a higher level
    }
}
