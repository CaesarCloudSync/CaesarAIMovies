import axios from "axios"


import { moviekeys } from "@/app/moviekeys";

import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import { TouchableOpacity,Text,View, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
export default function AnimeSeriesCard({film,setRecentManga,searchadd}:any){
    const pathname = usePathname();
    const router = useRouter();

    const [isonwishlist,setIsOnWishList]= useState(false)
    const getvideo = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        

        router.push({ pathname: "/amarianimeseasons", params: {"series":film.name.replaceAll(" ","-",),"film_name":film.name,"poster_path":film.poster_path}});

            

        

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
        const response = await axios.post(`https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/addwishlist?themoviedbid=${film.id}`,{"movie":film.name,"themoviedbid":film.id,"type":"tv"})
        let result = response.data
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
    const storeasrecent =async () => {
        if (pathname === "/search"){
            if (searchadd === true){
                console.log("hi")
                AsyncStorage.setItem(`media:${film.id}`,JSON.stringify({"series":film.name.replaceAll(" ","-",),"id":film.id,"name":film.name,"poster_path":film.poster_path,"vote_count":film.vote_count,"release_date":film.release_date,"vote_average":film.vote_average,"original_language":film.original_language,"mediatype":"tv"}))
                router.push("/search")
            }
            else{
                await AsyncStorage.removeItem(`media:${film.id}`)
                setRecentManga([])
            }


        }
        else{
            AsyncStorage.setItem(`media:${film.id}`,JSON.stringify({"series":film.name.replaceAll(" ","-",),"id":film.id,"name":film.name,"poster_path":film.poster_path,"vote_count":film.vote_count,"release_date":film.release_date,"vote_average":film.vote_average,"original_language":film.original_language,"mediatype":"tv"}))
            router.push("/search")

        }
    }
    useEffect(()=>{
        checkwishlist()
    },[isonwishlist])
    return(
        <View>
        <View style={{display:"flex",flexDirection:"column"}}>
            <TouchableOpacity onLongPress={() =>{storeasrecent()}} onPress={() =>{getvideo()}} >
            <Image src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} style={{width:175,height:300,borderRadius:5}} resizeMode={"contain"}></Image>
            </TouchableOpacity>
            <View style={{width:175,flex:1,gap:2}}>
                <Text style={{color:"white",fontSize:12}}>{film.name}</Text>
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