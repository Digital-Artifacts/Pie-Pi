'use client'

import React, { useEffect, useState } from 'react'

const Landing = () => {

    const [isConnected, setIsConnected] = useState(false);
    
    // Creating a function to connect user's wallet
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
        

        // Checking if user has Metamask installed
        if (!ethereum) {
            
            //if user doesn't have metamask installed, throw an error
            alert("Please install Metamask");
            return;
        }

        // If user has metamask installed, connect to user's wallet
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        // At last save the user's wallet address in browser's local storage
        localStorage.setItem("walletAddress", accounts[0]);
        setIsConnected(true);
        } catch (error) {
        console.log(error);
        }
    };

    // Check for the existing connection on initial render
    useEffect(() => {
        const checkExistingConnection = async () => {
            try {
                const { ethereum } = window;
                if (ethereum && ethereum.selectedAddress) {
                    setIsConnected(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkExistingConnection();
    }, []);

    

  return (
    <>

    {/* Creating a hero component with black background and centering everything in the screen */}
    <section className="relative bg-black flex flex-col h-screen justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="text-center pb-12 md:pb-16">
            
            <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" 
                data-aos="zoom-y-0ut"
            >   
            It's Youtube, but {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Decentralized</span>
            </h1>
        <div className='max-w-3xl mx-auto'>

            <p
                className="text-xl text-gray-400 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
            A Youtube CLone built on top of Polygon network, allows users to create, share and watch videos, without worrying about their privacy.
            </p>

            <button 
                className={`items-center bg-white rounded-full font-medium p-4 shadow-lg
                    ${ isConnected ? "bg-gray-500 text-white" : ""}`}               
                onClick={() => {
                    // Calling the connectWallet function when the button is clicked
                    connectWallet();
                } }
            >
            <span>{ isConnected ? "Wallet Connected" : "Connect wallet" }</span>
            </button>
        </div>
        </div>
        </div>
        </div>
    </section>
    


    </>
  )
}

export default Landing