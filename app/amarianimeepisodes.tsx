
import { useState ,useRef} from "react";
import { moviekeys } from "./moviekeys";
import axios from "axios";
//import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Episode from "@/components/amarianimeepisode/episode";
import { Image, View ,Text, FlatList, ScrollView} from "react-native";

import VideoPlayer from 'expo-video-player'
import { Video, ResizeMode } from 'expo-av';
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
export default function AmariAnimeEpisodes(){
    const navigate = useNavigation();
    const router = useRouter();
    const {animeid,film_name,poster_path,season_name} = useLocalSearchParams();
    const [season,setSeason] = useState<any>({});
    const [episodes,setEpisodes] = useState<any>([])
    const [video,setVideo] = useState("");
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const netInfo = useNetInfo();
    //console.log(season_name,"ho")


    const getfilmdetails = async () =>{
        let keys = await AsyncStorage.getAllKeys()
        const downloadeditems:any = await AsyncStorage.multiGet(keys.filter((key) =>{return(key.includes(`downloaded-episode:${animeid}_${season_name}`))}))
       
        if (netInfo.isInternetReachable === true){
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/info/${animeid}`)
        let result = response.data

        setEpisodes(result.episodes)
        
        setSeason(result)
        //AsyncStorage.setItem(`current_anime`,JSON.stringify({"animeid":animeid,"film_name":film_name,"poster_path":poster_path})) 

        }
        else if (netInfo.isInternetReachable === false){
            const animeitems = downloadeditems.map((item:any) =>{return(JSON.parse(item[1]))})
            animeitems.sort(function(a:any,b:any) {
         
                let bval = parseInt(b.number)
                let aval = parseInt(a.number)
                return aval- bval 
            })
            setSeason({"title":animeitems[0].season_name,"image":animeitems[0].season_image})
            setEpisodes(animeitems)
            
        }

        
    }
    const navseasons = () => {
        if (netInfo.isInternetReachable === true){
            router.push({ pathname: "/amarianimeseasons", params: {"animeid":animeid,"film_name":film_name,"poster_path":poster_path,"src":"animeepisodes"}});
        }
        else{
            router.push("/downloads")
        }
        
        
    }

    useEffect(() =>{
        getfilmdetails()
        
    },[netInfo])
    return(
        <View style={{backgroundColor:"#1e1e1e",flex:1,justifyContent:"center",alignItems:"center"}}>
        <StatusBar hidden/>
        
        <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={() =>{navseasons()}}>
            <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:20,top:30}}>
                                    <Image  src={season.image} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                                        <Text style={{color:"white",fontSize:20,fontWeight:"700"}}>{season.title}</Text>
                                        {netInfo.isInternetReachable === true && <Text style={{color:"white"}}>Total Episodes:{season.totalEpisodes}</Text>}
                                        <FlatList
                                                numColumns={3}
                                                style={{flex:1,width:300,height:300}}
                                                ItemSeparatorComponent={() => (
                                                    <View style={{  height: 10 }} />
                                                  )}
                                               
                
                                                
                                                columnWrapperStyle={{    flexGrow: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',gap:20}}
                                    
                                                data={episodes}
                                                renderItem={({item,index}:any) =>{
                                                    let episode = item
                                                    //console.log(episode)
                                                    let episodeid  = episode.episodeid ? episode.episodeid : episode.id
                                                    return(
                                                        <Episode animeid={animeid} season_name={season_name} season_image={season.image} film_name={film_name}poster_path={poster_path} numeps={episodes.length} episodeid={episodeid} number={episode.number} setVideo={setVideo}/>
                                                    )
                                                }}
                                            >
                                                
                                            </FlatList>
                                        <Text style={{marginTop:10,color:"white"}}>Description:</Text>
                                {netInfo.isInternetReachable === true &&
                                    
                                <ScrollView style={{maxHeight:300,maxWidth:300}}>
                                    <Text style={{color:"white"}}>{season.description}</Text>
                                </ScrollView>}
                                        
                
            </View>
            


        </View>
    )
}

/*

                <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
   
                video !== "" && !media &&
                <ReactPlayer
                style={{marginTop:"300px"}}
                width={400}
                height={300}
                playing={true}
                controls={true}
                url={video}
                ></ReactPlayer>
    *
    </View>*/