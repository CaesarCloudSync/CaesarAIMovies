
import axios from "axios";

import { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from 'expo-av'
import { useNavigation } from "expo-router";
import { setStatusBarHidden } from 'expo-status-bar'
import { Dimensions } from "react-native";
import { useRef } from "react";
import * as ScreenOrientation from 'expo-screen-orientation'
export default function VideoEpisode(){
    const navigation = useNavigation();
    const {animelink} = useLocalSearchParams();
    const [inFullscreen, setInFullsreen] = useState(false)
    const [inFullscreen2, setInFullsreen2] = useState(false)
    const [isMute, setIsMute] = useState(false)
    const refVideo = useRef(null)
    const refVideo2 = useRef<any>(null)
    const refScrollView = useRef<any>(null)

    //console.log(film.original_language)
    //console.log(haswatchedcookie,"hi")
    return(
    <View style={{backgroundColor:"black",flex:1,justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity style={{position:"absolute",top:10,zIndex:99}} onPress={() =>{navigation.goBack();}}>
        <Text style={{color:"white"}}>Back</Text>
        </TouchableOpacity>
        <View style={{top:inFullscreen2 ? 0 : 300}}>
        <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          ref: refVideo2,
        }}
        icon={{
          play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
          pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
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
            setStatusBarHidden(false, 'fade')
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
      <View style={{flex:1,height:200,width:200}}>
        <Text style={{color:"white"}}>Hi</Text>

      </View>
      </View>
    </View>
    )
}

/*

        <View onClick={() =>{getepisode()}} style={{display:"flex",border:"1px solid black",backgroundColor:haswatchedcookie === "true" ? "blue":"white",opacity:haswatchedcookie === "true" ? "0.2":"1",borderRadius:"5px",height:"30px",width:"30px",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
            <a style={{color:haswatchedcookie === "true" ? "white":"black"}}>{number}</a>

            
        </View>*/