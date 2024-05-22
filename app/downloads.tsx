import { View,Text,Image,FlatList} from "react-native";
import NavigationFooter from "./footer";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/header/header";
import * as FileSystem from 'expo-file-system';
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimeSeriesCard from "@/components/animeseriescard/animeseriescard";
import DownloadedAnimeSeriesCard from "@/components/animeseriescard/downloadedanimeseriescard";
export default function Downloads(){
    const [progress,setProgress] = useState({});
    const [downloadedmanga,setDownloadedManga]  = useState<any>([]);
    const callback = (downloadProgress:any) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress({
          downloadProgress: progress,
        });
      };

    const getdownloadedmanga =async () => {
        let keys = await AsyncStorage.getAllKeys()
        const items:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes("downloaded-season:"))}))
         ////console.log(items)
         const mangaitems = items.map((item:any) =>{return(JSON.parse(item[1]))})
         console.log(mangaitems)
        setDownloadedManga(mangaitems)
        
     }


     useEffect(() =>{
        if (downloadedmanga.length === 0){
            getdownloadedmanga()
        }
     },[downloadedmanga])
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <StatusBar  hidden/>
            <Header style={{flex:1.3}}/>
            {downloadedmanga.length !== 0&&
                <View style={{flex:1,padding:30}}> 
                        <FlatList
                        numColumns={2}
                        style={{flex:1, flexGrow: 1}}
                        
                        columnWrapperStyle={{    flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',gap:20}}
                        data={downloadedmanga}
                        renderItem={({item,index}:any) => {
                            let film = item
                        
                            return(
                              <DownloadedAnimeSeriesCard key={index} film={film} setRecentManga={setDownloadedManga}/>
                          )
                        }
                    }

                  /></View>}
            {downloadedmanga.length === 0 && <View style={{flex:1}}></View>}

            <NavigationFooter style={{flex:0.1}} currentpage={"downloads"}/>

        </View>
    )
}