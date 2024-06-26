import axios from "axios"


import { moviekeys } from "@/app/moviekeys";

import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";


import { useEffect, useState } from "react";
import { TouchableOpacity,Text,View, Image} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function MovieCard({film}:any){
    const router = useRouter();

    const [isonwishlist,setIsOnWishList]= useState(false)

    const getvideo = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${film.id}/external_ids`,config)
        let result = response.data
        let url = `https://vidsrc.to/embed/movie/${result.imdb_id}`
        router.push({ pathname: "/movieplay", params: {"movieurl":url}});
        

    }
    const checkwishlist = async () =>{
        const response = await axios.get(`https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/checkwishlist?themoviedbid=${film.id}`)
        let result = response.data
        if (result.result === "true"){
                setIsOnWishList(true)
        }
        else{
            setIsOnWishList(false)
        }
    }
    const addtowishlist = async () =>{
        const response = await axios.post(`https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/addwishlist?themoviedbid=${film.id}`,{"movie":film.title,"themoviedbid":film.id,"type":"movie"})
        let result = response.data
        //console.log(result)
        if ("message" in result){
                setIsOnWishList(true)
        }
    }
    const removefromwishlist = async () =>{
        const response = await axios.delete(`https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/deletefromwishlist?themoviedbid=${film.id}`)
        let result = response.data
        if ("message" in result){
                setIsOnWishList(false)
        }

    }
    useEffect(()=>{
        checkwishlist()
    },[])
    ////console.log(film)
    return(
        <View>
        <View style={{display:"flex",flexDirection:"column"}}>
            <TouchableOpacity onPress={() =>{getvideo()}} >
            <Image src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} style={{width:175,height:300,borderRadius:5}} resizeMode={"contain"}></Image>
            </TouchableOpacity>
            <View style={{width:175,flex:1,gap:2}}>
                <Text style={{color:"white",fontSize:12}}>{film.title}</Text>
                <Text style={{color:"white",fontSize:12}}>Vote Count: {film.vote_count}</Text>
                
                <Text style={{color:"white",fontSize:12}}>Release Date: {film.release_date}</Text>
                <Text style={{color:"white",fontSize:12}}>Rating: {film.vote_average.toFixed(2)}</Text>
                {isonwishlist === false ? 
                <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={() =>{addtowishlist()}} ><AntDesign name="hearto" size={24} color="white" /></TouchableOpacity>
                :
                <TouchableOpacity style={{alignSelf:"flex-end"}}  onPress={() =>{removefromwishlist()}} ><AntDesign name="heart" size={24} color="white" /></TouchableOpacity>
                }
                
            </View>

        </View>
    
    </View>
    )
}