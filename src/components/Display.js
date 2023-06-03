import { useState } from "react";


import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
   
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
   //try catch same address se access kr lega otherwise msg as you dont have access
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    //length url ki 0 hogi to run karke faida nhi
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
  //split the array that is formed as link for ipfs storage
        const str = dataArray.toString();
      const str_array = str.split(",");
     // console.log(str);
      
      const images = str_array.map((item, i) => {
        return (
        
            
            //i made hyperlink to get image in full size from ipfs link
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            >

            </img>
         
          </a>
        );
      });

      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address to fetch image "
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
       Display Images
      </button>
    </>
  );
};

export default Display;
