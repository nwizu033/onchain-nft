import abi from 'utils/abi.json';
import { useSigner } from "wagmi";
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const contractAddress = "0x3c5aD009d2e9f11A06c6ec31377D612C81f6b224"
  const { data: signer, isError, isLoading } = useSigner();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [yourNft, setYourNft] = useState();
  const [tokenId, setTokenId] = useState();
   

  const seeNft = async() =>{
    if(signer) {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.seeYourNft(tokenId);
      console.log(result);
      setYourNft(result);
    }
  } 

  const mintNft = async() =>{
    if(signer) {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.mintNft(name,desc);
      await result.wait()
      alert("Done minting")
    }
  } 
  return (
    <div>
      
      <div className='flex flex-col lg:w-[600px]'>
        <p className=' text-3xl text-center font-medium mt-4'>MINT YOUR NFT</p>
        <input className=' my-4 py-3 bg-transparent border-black border-2 rounded-lg px-4' onChange={(e) =>setName(e.target.value)} type='text' placeholder='Enter your name' />
        <input className=' my-4 py-3 bg-transparent border-black border-2 rounded-lg px-4' onChange={(e) =>setDesc(e.target.value)} type='text' placeholder='Enter descriptiion'/>
        <button onClick={mintNft} className=' my-4 py-3 bg-yellow-200 border-black border-2 rounded-lg px-4 text-xl font-medium tracking-widest'>Mint</button>
      </div>
      
   

        <p className='text-3xl text-center font-medium mt-16'>Verify Your NFT</p>
        <div className='flex flex-col lg:w-[600px]'>
          <input className='my-4 py-3 bg-transparent border-black border-2 rounded-lg px-4' onChange={(e)=>{setTokenId(e.target.value)}} type='number' placeholder='Token Id'/>
          <button className='my-4 py-3 bg-yellow-200 border-black border-2 rounded-lg px-4 text-xl font-medium tracking-widest' onClick={seeNft}>Verify</button>
        </div>
      
        { 
        yourNft?.map((res) => (
            <div key={res.id}>
              <div className='flex justify-center'>
                <Image src={res.image} alt={res.name} height={400} width={400}/>
              </div>
             
              <div className='flex justify-between border-black border-b-2 px-8'>
                 <span className=' text-xl font-medium'>{res.name}</span>  <span className=' text-xl font-medium'> Token ID: {(res.id).toString()}</span> 
              </div>
            
            </div>
          ))
        }

    </div>
  )
}
