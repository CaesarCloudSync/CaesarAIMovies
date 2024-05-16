import { ResizeMode } from 'expo-av'
import { useLocalSearchParams } from 'expo-router';
import VideoPlayer from 'expo-video-player'
import { WebView } from 'react-native-webview';
import { Text, TouchableOpacity, View } from 'react-native';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import {Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
    const navigate = useNavigation();
    const {movieurl} = useLocalSearchParams();


  return (
    <View style={{flex:1,backgroundColor:"black"}}>
        <StatusBar  hidden/>
        <View style={{flex:0.03}}>
            <TouchableOpacity onPress={() =>{navigate.goBack()}}>
            <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>

        </View>
        <WebView
        style={{flex:1,width:418}}
  allowsFullscreenVideo
  allowsInlineMediaPlayback
  mediaPlaybackRequiresUserAction
  source={{ uri: `${movieurl}`,marginTop: Constants.statusBarHeight}} 
  onShouldStartLoadWithRequest={request => {
    //console.log(request.url,"hi")
    if (request.url.includes('https')) {
        return false;
    } else return true;
   }}
   onNavigationStateChange={
    request => {
        ////console.log(request.url,",hil")
        if (request.url.includes('https')) {
            return false;
        } else return true;
       }
   }
   setSupportMultipleWindows={false}

/>
    </View>


)
}
