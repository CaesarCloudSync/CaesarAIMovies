
import axios from "axios";

import { useEffect, useState} from "react";
import { View,Text,StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import VideoPlayer from "expo-video-player";
import { useNavigation } from "expo-router";
import { StatusBar, setStatusBarHidden } from 'expo-status-bar'
import { Dimensions } from "react-native";
import { useRef } from "react";
import * as ScreenOrientation from 'expo-screen-orientation'
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video, ResizeMode } from 'expo-av';
import { ActivityIndicator } from "react-native";
export default function VideoEpisode(){
  const video = useRef<any>(null);
    const navigation = useNavigation();
    const router = useRouter();
    const [showBack] = useState(true);
    const {animelink,episodeid,numeps,number,animeid,film_name,poster_path,season_image,season_name}:any = useLocalSearchParams();
    const [inFullscreen, setInFullsreen] = useState(false)
    const [inFullscreen2, setInFullsreen2] = useState(false)
    const [isMute, setIsMute] = useState(false)
    const refVideo = useRef(null)
    const refVideo2 = useRef<any>(null)
    const refScrollView = useRef<any>(null)
    const [status, setStatus] = useState({});
    const [isPreloading,setIsPreloading] = useState(false)
    const navnextep =async () => {
      ////console.log(episodeid)
      ////console.log(parseInt(episodeid.replace(/^\D+/g, '').trim()))
      let current_epnum:any = parseInt(number) 
      ////console.log(current_epnum)
      if (current_epnum <parseInt(numeps) ){
        let ep_prefix = episodeid.substring(0, episodeid.length - 1);
        let next_number = (current_epnum + 1).toString()
        let next_episodeid = ep_prefix + next_number
      const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${next_episodeid}?server=vidstreaming`);
      let result = response.data

      let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]
      
      router.push({ pathname: "/videoepisode", params: {"animelink":video.url,"episodeid":next_episodeid,"numeps":numeps,"number":next_number,"animeid":animeid,"film_name":film_name,"poster_path":poster_path,"season_image":season_image,"season_name":season_name}});
      
      
    }

  }
  const navprevep =async () => {
    let current_epnum:any = parseInt(number) 
    if (current_epnum > 0){
      let ep_prefix = episodeid.replace(/[0-9]/g, '')
      let prev = current_epnum - 1
      let prev_number:any = (current_epnum - 1).toString()
      let prev_episodeid:any = ep_prefix + prev_number
      ////console.log(next_episodeid) 
      const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${prev_episodeid}?server=vidstreaming`);
      let result = response.data
      let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]
  
      router.push({ pathname: "/videoepisode", params: {"animelink":video.url,"episodeid":prev_episodeid,"numeps":numeps,"number":prev_number,"film_name":film_name,"poster_path":poster_path,"season_image":season_image,"season_name":season_name}});
      

    }
    
  }
  const navepisodes =async () => {
    router.push({ pathname: "/amarianimeepisodes", params: {"animeid":animeid,"film_name":film_name,"poster_path":poster_path}});
    
  }
  const setcurrentreading =async () => {
    const current_anime = await AsyncStorage.getItem("current_anime")
    console.log(season_name)
    AsyncStorage.setItem(`current_watching_anime:${animeid}`,JSON.stringify({"animelink":animelink,"episodeid":episodeid,"numeps":numeps,"number":number,"animeid":animeid,"film_name":film_name,"poster_path":poster_path,"season_image":season_image,"season_name":season_name})) // -${chapterid}
    router.push("/library")
}

const changeorientation =async () => {
  let orientation = await ScreenOrientation.getOrientationAsync(); 

  if (orientation === 1){
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
      video.current.setStatusAsync({
        shouldPlay: true,
      })
      setInFullsreen2(true)
  }
  else{
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
      setInFullsreen2(false)
  }
}


    ////console.log(animelink)
    ////console.log(haswatchedcookie,"hi")
    return(
    <View style={{backgroundColor:"black",flex:1,justifyContent:"center",alignItems:"center"}}>
      <StatusBar hidden/>
        {!inFullscreen2&&
          <TouchableOpacity style={{position:"absolute",top:10,zIndex:99,alignSelf:"flex-start"}} onPress={() =>{navigation.goBack()}}>
          <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>}
        <View style={{top:inFullscreen2 ? 0 : 300}}>
        <View style={{justifyContent:"center",alignItems:"center"}}><Text style={{color:"white"}}>Episode: {number}</Text></View>
        {isPreloading &&
            <ActivityIndicator
                animating
                color={"gray"}
                size="large"
                style={{ flex: 1, position:"absolute", top:"50%", left:"45%" }}
            />
        }
        <Video
          ref={video}
          style={{
            alignSelf: 'center',
            width: 420,
            height: 300,
          }}
          onFullscreenUpdate={(e)=>{
              changeorientation()
          }}
          shouldPlay={true}
          source={{
            uri: `${animelink}`,
          }}
          onPlaybackStatusUpdate={(status:any) =>{
            //console.log(status)
            if(status.isBuffering === true){
              setIsPreloading(true)
            }
            else{
              setIsPreloading(false)
            }
          }}  
          onLoadStart={() => setIsPreloading(true)}
          useNativeControls
          onReadyForDisplay={() => setIsPreloading(false)}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onError={() =>{
        ////console.log("hi")
           router.push({ pathname: "/videoepisode", params: {"animelink":animelink,"episodeid":episodeid,"numeps":numeps,"number":number,"film_name":film_name,"poster_path":poster_path,"season_image":season_image,"season_name":season_name}});
      
          }}
        >
          
        </Video>


      <View style={{flex:1,height:200,width:200,flexDirection:"row",gap:30,justifyContent:"center",left:110}}>
      <TouchableOpacity onPress={() =>{navprevep()}}>
      <MaterialIcons name="skip-previous" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{navepisodes()}} onLongPress={()=>{setcurrentreading()}}>
            <Image style={{width:40,height:30}} alt="hello" source={require("./CaesarAIMoviesLogo.png")}></Image>
            </TouchableOpacity>
        <TouchableOpacity onPress={() =>{navnextep()}}>
        <Entypo name="controller-next" size={24} color="white" />
        </TouchableOpacity>

      </View>
      </View>
    </View>
    )
}


