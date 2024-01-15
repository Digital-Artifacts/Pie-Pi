import { abi } from "../constants/videoPie";
import { Contract_Address } from "../constants/videoPie";
import { ethers } from "ethers";

export default async function getContract() {
    
    // Creating a new provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
        
    // Getting the signer
    const signer = await provider.getSigner();
    
    // Creating a new contract factory with the signer, address and ABI
    let contract = new ethers.Contract(
      Contract_Address,
      abi,
      signer
    );
    
    // Returning the contract
    return contract;
    } catch (error) {

        // Handle any errors that might occur during provider or signer interactions
        console.error("Error fetching contract:", error);
        throw error; // Rethrow to allow handling at higher level
    }
    
  }
  