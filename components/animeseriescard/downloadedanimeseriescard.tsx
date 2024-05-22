import axios from "axios"


import { moviekeys } from "@/app/moviekeys";

import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import { TouchableOpacity,Text,View, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
export default function DownloadedAnimeSeriesCard({film,setRecentManga}:any){
    const pathname = usePathname();
    const router = useRouter();
    const getvideo = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        

        router.push({ pathname: "/amarianimeepisodes", params: {"animeid":film.animeid,"film_name":film.film_name,"poster_path":film.season_image,"season_name":film.season_name}});
        //router.push({ pathname: "/amarianimeseasons", params: {"series":film.name.replaceAll(" ","-",),"film_name":film.name,"poster_path":film.poster_path}});

            

        

    }



    return(
        <View>
        <View style={{display:"flex",flexDirection:"column"}}>
            <TouchableOpacity  onPress={() =>{getvideo()}} >
            <Image src={film.season_image} style={{width:175,height:300,borderRadius:5}} resizeMode={"contain"}></Image>
            </TouchableOpacity>
            <View style={{width:175,flex:1,gap:2}}>
                <Text style={{color:"white",fontSize:12}}>{film.season_name}</Text>

            </View>

        </View>
    
    </View>
    )
}