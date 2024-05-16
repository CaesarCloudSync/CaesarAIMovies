import { moviekeys } from "@/app/moviekeys";
import axios from "axios";


import { useEffect, useState } from "react";
import { TouchableOpacity, View,Text} from "react-native";
import { useRouter } from "expo-router";
export default function Episode({seriesid,episode,season_number}:any){
    const router = useRouter();

    const getepisode = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesid}/external_ids`,config)
        let result = response.data
        //bake_cookie(cookie_key, 'true');
        //delete_cookie(cookie_key)"
        //setHasWatchedCookie("true")
        router.push({ pathname: "/movieplay", params: {"movieurl":`https://vidsrc.to/embed/tv/${result.imdb_id}/${season_number}/${episode}`}});
        // 


    }

    //console.log(film.original_language)
    //console.log(haswatchedcookie,"hi")
    return(
        <TouchableOpacity  onPress={() =>{getepisode()}}>
        <View style={{flex:1,backgroundColor:"white",opacity:1,borderRadius:5,height:30,width:30,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"black"}}>{episode}</Text>
        </View>
        </TouchableOpacity>
    )
}