import axios from "axios"

import { moviekeys } from "@/app/moviekeys";

import { useState,useEffect } from "react";
import { useRouter } from "expo-router";
import { View ,Text,Image} from "react-native";
import { TouchableOpacity } from "react-native";

export default function Wish({themoviedbid,broadcasttype,wishlist,setWishlist}:any){
    const router = useRouter();
    const [film,setFilm] = useState<any>("")
    const getvideo = async () =>{
        if (broadcasttype === "movie"){
            const config = {
                headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
            };
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${themoviedbid}/external_ids`,config)
            let result = response.data
            router.push({ pathname: "/movieplay", params: {"movieurl":`https://vidsrc.to/embed/movie/${result.imdb_id}`}});//
        }
        else{
            router.push({ pathname: "/amarianimeseasons", params: {"series":film.name.replaceAll(" ","-",),"film_name":film.name,"poster_path":film.poster_path}});
        }



    }

    const getwishdetails = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        const response = await axios.get(`https://api.themoviedb.org/3/${broadcasttype}/${themoviedbid}`,config)
        let result = response.data
        setFilm(result)

    }
    function removeValue(value:any, index:any, arr:any) {
        if (value.themoviedbid === film.id) {
            arr.splice(index, index+1);
            return true;
        }
        return false;
    }


    const removefromwishlist = async () =>{
        const response = await axios.delete(`https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/deletefromwishlist?themoviedbid=${film.id}`)
        let result = response.data
        if ("message" in result){
            let new_wishlist  = wishlist.filter((a:any) => {console.log(a.themoviedbid,film.id);return(a.themoviedbid !== film.id)})
            setWishlist(new_wishlist);

        }

    }
    useEffect(()=>{
            getwishdetails()
    },[])

    return(
        <View>
            <View>
            </View>
            {film !== "" &&
                    <View style={{display:"flex",flexDirection:"column"}}>
                       
                    <TouchableOpacity onPress={() =>{getvideo()}}>
                    <Image  src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                    </TouchableOpacity>
                    <View style={{width:100,marginTop:30}}>
                        <Text style={{color:"white",fontSize:12}}>{broadcasttype === "movie" ? film.title : film.name}</Text>
                        <Text style={{color:"white",fontSize:12}}>Vote Count: {film.vote_count}</Text>
                        
                        <Text style={{color:"white",fontSize:12}}>Release Date: {broadcasttype === "movie" ? film.release_date:film.first_air_date }</Text>
                        <Text style={{color:"white",fontSize:12}}>Rating: {film.vote_average.toFixed(2)}</Text>
                        <TouchableOpacity onPress={() =>{removefromwishlist()}} style={{cursor:"pointer"}}><Text>Favourite</Text></TouchableOpacity>
                    </View>
        
                </View>}

    
    </View>
    )
}