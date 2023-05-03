import abi from 'utils/abi.json';
import { useSigner } from "wagmi";
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function Home() {
  const contractAddress = "0x2D1F4a53A53Ff331eEFDaB9D7DD37d06812275d2"
  const { data: signer, isError, isLoading } = useSigner();
  const [nftList, setNftList] = useState();
  

  const seeOwner = async() =>{
    if(signer) {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.seeNFTs();
      setNftList(result);
    }
  } 
  return (
    <div>
      <div className="h1">There you go... a canvas for your next Celo project!</div>
      <button onClick={seeOwner}>See name</button>
      <div>
        {
          nftList?.map((res) =>(
            <div>
              <Image src={res.image} alt='nft' height={300} width={300}/>
            </div>
          ))
        }
        </div>

    </div>
  )
}
