import { moviekeys } from "@/app/moviekeys";
import axios from "axios";

import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function Episode({episodeid,number}:any){
    const router = useRouter();
    const [cookie_key,setCookieKey] = useState(`${episodeid}`)
    //const [haswatchedcookie,setHasWatchedCookie] = useState(read_cookie(cookie_key))
    const getepisode = async () =>{
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${episodeid}?server=vidstreaming`);
        let result = response.data
        let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]
        //bake_cookie(cookie_key, 'true');
        //delete_cookie(cookie_key)"
        //setHasWatchedCookie("true")
        console.log(video.url)
  
        router.push({ pathname: "/videoepisode", params: {"animelink":video.link}});


    }

    //console.log(film.original_language)
    //console.log(haswatchedcookie,"hi")
    return(
        <TouchableOpacity onPress={() =>{getepisode()}} style={{display:"flex",backgroundColor:"white",opacity:1,borderRadius:5,height:30,width:30,justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
       
                <Text style={{color:"black"}}>{number}</Text>


        </TouchableOpacity>
    )
}

/*

        <View onClick={() =>{getepisode()}} style={{display:"flex",border:"1px solid black",backgroundColor:haswatchedcookie === "true" ? "blue":"white",opacity:haswatchedcookie === "true" ? "0.2":"1",borderRadius:"5px",height:"30px",width:"30px",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
            <a style={{color:haswatchedcookie === "true" ? "white":"black"}}>{number}</a>

            
        </View>*/