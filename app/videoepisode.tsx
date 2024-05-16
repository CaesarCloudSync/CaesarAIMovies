
import axios from "axios";

import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from 'expo-av'
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

export default function VideoEpisode(){
    const navigation = useNavigation();
    const router = useRouter();
    const [showBack] = useState(true);
    const {animelink,episodeid,numeps,number,animeid,film_name,poster_path}:any = useLocalSearchParams();
    const [inFullscreen, setInFullsreen] = useState(false)
    const [inFullscreen2, setInFullsreen2] = useState(false)
    const [isMute, setIsMute] = useState(false)
    const refVideo = useRef(null)
    const refVideo2 = useRef<any>(null)
    const refScrollView = useRef<any>(null)
    const navnextep =async () => {
      //console.log(episodeid)
      //console.log(parseInt(episodeid.replace(/^\D+/g, '').trim()))
      let current_epnum:any = parseInt(episodeid.replace(/^\D+/g, '').trim()) 
      if (current_epnum <parseInt(numeps) ){
        let ep_prefix = episodeid.replace(/[0-9]/g, '')
        let next_number = (current_epnum + 1).toString()
        let next_episodeid = ep_prefix + next_number
      //console.log(next_episodeid)
      const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${next_episodeid}?server=vidstreaming`);
      let result = response.data
      let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]
      
      router.push({ pathname: "/videoepisode", params: {"animelink":video.url,"episodeid":next_episodeid,"numeps":numeps,"number":next_number,"animeid":animeid,"film_name":film_name,"poster_path":poster_path}});
      
      
    }

  }
  const navprevep =async () => {
    let current_epnum:any = parseInt(episodeid.replace(/^\D+/g, '').trim()) 
    if (current_epnum > 0){
      let ep_prefix = episodeid.replace(/[0-9]/g, '')
      let prev = current_epnum - 1
      let prev_number:any = (current_epnum - 1).toString()
      let prev_episodeid:any = ep_prefix + prev_number
      //console.log(next_episodeid) 
      const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${prev_episodeid}?server=vidstreaming`);
      let result = response.data
      let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]
  
      router.push({ pathname: "/videoepisode", params: {"animelink":video.url,"episodeid":prev_episodeid,"numeps":numeps,"number":prev_number}});
      

    }
    
  }
  const navepisodes =async () => {
    router.push({ pathname: "/amarianimeepisodes", params: {"animeid":animeid,"film_name":film_name,"poster_path":poster_path}});
    
  }


    //console.log(animeid)
    //console.log(haswatchedcookie,"hi")
    return(
    <View style={{backgroundColor:"black",flex:1,justifyContent:"center",alignItems:"center"}}>
      <StatusBar hidden/>
        {!inFullscreen2&&
          <TouchableOpacity style={{position:"absolute",top:10,zIndex:99,alignSelf:"flex-start"}} onPress={() =>{navepisodes()}}>
          <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>}
        <View style={{top:inFullscreen2 ? 0 : 300}}>
        <VideoPlayer
        
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: `${animelink}`,
          },
          ref: refVideo2,
        }}
        icon={{
          play: <FontAwesome name="play" size={24} color="white" />,
          pause: <AntDesign name="pause" size={24} color="white" />,
        }}
        mute={{
          enterMute: () => setIsMute(!isMute),
          exitMute: () => setIsMute(!isMute),
          isMute,
        }}
        fullscreen={{
          inFullscreen: inFullscreen2,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen2(!inFullscreen2)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
            refVideo2.current.setStatusAsync({
              shouldPlay: true,
            })
          },
          exitFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen2(!inFullscreen2)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
          },
        }}
        
        style={{
          videoBackgroundColor: 'black',
          height: inFullscreen2 ? Dimensions.get('window').width : 250,
          width: inFullscreen2 ? Dimensions.get('window').height : 500,
        }}
      />
      <View style={{flex:1,height:200,width:200,flexDirection:"row",gap:30,justifyContent:"center",left:120}}>
      <TouchableOpacity onPress={() =>{navprevep()}}>
      <MaterialIcons name="skip-previous" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{color:"white"}}>{number}</Text>
        <TouchableOpacity onPress={() =>{navnextep()}}>
        <Entypo name="controller-next" size={24} color="white" />
        </TouchableOpacity>

      </View>
      </View>
    </View>
    )
}

/*

        <View onClick={() =>{getepisode()}} style={{display:"flex",border:"1px solid black",backgroundColor:haswatchedcookie === "true" ? "blue":"white",opacity:haswatchedcookie === "true" ? "0.2":"1",borderRadius:"5px",height:"30px",width:"30px",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
            <a style={{color:haswatchedcookie === "true" ? "white":"black"}}>{number}</a>

            
        </View>*/