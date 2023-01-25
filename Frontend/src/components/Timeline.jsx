import React from 'react'
import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../utils/styles/Contexte";
import InfiniteScroll from 'react-infinite-scroll-component';
import Publication from './Publication';
import { ListTimeline } from '../datas/ListTimeline';
export default function Timeline() {

  const {auth}=useContext(AuthContext)

  const [data,setData]=useState([]);

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/timeline/', {
          headers: { Authorization: `Bearer ${auth.user.accessToken}`},
    })
        //.then((res) => console.log(res.data.user.hobbies))
        .then((res) => setData(res.data.user.hobbies))
        .catch((error) => console.log(error));
    }, [auth.user.accessToken]);

    console.log(data[0]);


  return (
    <div>
      <Publication></Publication>
           {/* {data.map((x) => (
     <Publication   userName={x.publication[0].owner.name} pubContents={x.publications[0].contents} userphoto={x.publications[0].owner.profile_photo}/>
    ))} */}
    </div>
  )
}
