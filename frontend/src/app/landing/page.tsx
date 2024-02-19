'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';

import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton } from '@particle-network/connect-react-ui';


const LandingPage = () => {
    const params = useParams<{slug:string}>

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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-teal-400">Pie - {" "}</span>   
            
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-teal-400">
            Pi</span>
            </h1>
            
            <h2 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" 
                data-aos="zoom-y-0ut"
            >   
            
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-red-400">
            A video sharing network coming to Avalanche..</span>
            </h2>
        <div className='max-w-3xl mx-auto'>

            <p
                className="text-xl text-gray-400 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
            Create! Share! and Watch Videos! on the blockchain!! 
            </p>

    

            
            
            <button className='items-center  bg-white rounded-full font-medium hover:bg-red-500 p-4 shadow-lg mr-6'>
                <Link className="text-base font-medium hover:underline text-black text-" href="./home">
                    Watch Videos
                </Link>
            </button>

            <button className='items-center  bg-white rounded-full hover:bg-sky-500 font-medium  p-4 shadow-lg ml-6'>
                <Link className="text-base font-medium hover:underline text-black" href="./upload">
                    Upload Videos
                </Link>
            </button>
            

            
            <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, openChainModal, accountLoading }) => {
                return (
                    <div>
                        <button onClick={openConnectModal} disabled={!!account} className='items-center  bg-white rounded-full font-medium hover:bg-red-500 p-4 shadow-lg mr-6'>
                        
                        <Link className="text-base font-medium hover:underline text-black" href={`/profile/${account}`}>
                            Open Connect
                        </Link>
                        </button>
                        <br />
                        
                        <button onClick={openAccountModal} disabled={!account}>
                            Logout
                        </button>
                        <br />
                        <br />
                        {/* <button onClick={openChainModal} disabled={!account}>
                            Open Switch Network
                        </button>
                        <div>
                            <h3>account</h3>
                            <p>{account}</p>
                        </div> */}
                    </div>
                );
            }}
        </ConnectButton.Custom>



           
        </div>
        </div>
        </div>
        </div>
    </section>
    


    </>
  )
}

export default LandingPage