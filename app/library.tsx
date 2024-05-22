import { View } from "react-native";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { FlatList,TouchableOpacity,Image,Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
import { useNetInfo } from "@react-native-community/netinfo";
import { router } from "expo-router";
export default function Library(){
    const [recentmanga,setRecentManga]= useState<any>([]);
    const netInfo = useNetInfo();

    const getcurrentreading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("current_watching_anime:"))}))
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
         setRecentManga(mangaitems)
        
     }
     const get_downloaded_current_reading =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("current_watching_anime:"))}))
         console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
        const mangaitemspromises = mangaitems.map(async (item:any) =>{

            const downloaded_item = await AsyncStorage.getItem(`downloaded-season:${item.animeid}_${item.season_name}`)
            if (downloaded_item !== null){
                return item
            }
            else{
                return null
            }
         })
         const downloaded_current_reading = (await Promise.all(mangaitemspromises)).filter((item) =>{return(item !== null)})
         //console.log(downloaded_current_reading)
         setRecentManga(downloaded_current_reading)
     }
     useEffect(()=>{
        
        if (recentmanga.length === 0){
            ////console.log(netInfo.isInternetReachable)
            if (netInfo.isInternetReachable === true){
                getcurrentreading()
            }
            else if (netInfo.isInternetReachable === false){
                get_downloaded_current_reading()
            }
        
    }
    },[netInfo,recentmanga])
    const removefromlibrary =async (animeid:any) => {
        await AsyncStorage.removeItem(`current_watching_anime:${animeid}`)
        setRecentManga([])
    }
    ////console.log("hi")
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <Header/>
            <StatusBar  hidden/>
            {recentmanga.length !== 0 &&
            <FlatList
                    numColumns={2}
                    style={{flex:1}}
                    
                    
                    ItemSeparatorComponent={() => (
                        <View style={{  height: 10 }} />
                      )}
                   
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',gap:20}}

                    data={recentmanga}
                    renderItem={({item,index}:any) => {
                        let film = item
                        console.log(film)
                      
                            return (
                                <View>
                                <View style={{display:"flex",flexDirection:"column"}}>
                                    <TouchableOpacity onLongPress={() =>{removefromlibrary(film.animeid)}} onPress={() =>{router.push({ pathname: "/videoepisode", params: {"animelink":film.animelink,"episodeid":film.episodeid,"numeps":film.numeps,"number":film.number,"animeid":film.animeid,"film_name":film.film_name,"poster_path":film.poster_path}});}} > 
                                    <Image src={film.season_image} style={{width:175,height:300,borderRadius:5}} resizeMode={"contain"}></Image>
                                    </TouchableOpacity>
                                    <View style={{width:175,flex:1,gap:2}}>
                                        <Text style={{color:"white",fontSize:12}}>{film.season_name}</Text>
                                        <Text style={{color:"white",fontSize:12}}>Episode: {film.number}/{film.numeps}</Text>

  
                                    </View>
                        
                                </View>
                            
                            </View>
                        
                        
                            )
                    }
                }

            />}
            {recentmanga.length === 0 && <View style={{flex:1}}></View>}
            <NavigationFooter style={{flex:0.1}} currentpage={"library"}/>
            
        </View>
    )
}