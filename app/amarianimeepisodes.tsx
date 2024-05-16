
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
export default function AmariAnimeEpisodes(){
    const navigate = useNavigation();
    const router = useRouter();
    const {animeid,film_name,poster_path} = useLocalSearchParams();
    const [season,setSeason] = useState<any>({});
    const [episodes,setEpisodes] = useState<any>([])
    const [video,setVideo] = useState("");
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});


    const getfilmdetails = async () =>{
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/info/${animeid}`)
        let result = response.data

        setEpisodes(result.episodes)

        setSeason(result)

   

        
    }
    const navseasons = () => {
        router.push({ pathname: "/amarianimeseasons", params: {"animeid":animeid,"film_name":film_name,"poster_path":poster_path,"src":"animeepisodes"}});
        
        
    }

    useEffect(() =>{
        getfilmdetails()
        
    },[])
    return(
        <View style={{backgroundColor:"#1e1e1e",flex:1,justifyContent:"center",alignItems:"center"}}>
        <StatusBar hidden/>
        
        <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={() =>{navseasons()}}>
            <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
   
            <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:20,top:30}}>
                                    <Image  src={season.image} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                                        <Text style={{color:"white",fontSize:20,fontWeight:"700"}}>{season.title}</Text>
                                        <Text style={{color:"white"}}>Total Episodes:{season.totalEpisodes}</Text>
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
                                                    return(
                                                        <Episode animeid={animeid} film_name={film_name}poster_path={poster_path} numeps={episodes.length} episodeid={episode.id} number={episode.number} setVideo={setVideo}/>
                                                    )
                                                }}
                                            >
                                                
                                            </FlatList>
                                        <Text style={{marginTop:10,color:"white"}}>Description:</Text>
                                        <ScrollView style={{maxHeight:300,maxWidth:300}}>
                                            <Text style={{color:"white"}}>{season.description}</Text>
                                        </ScrollView>
                                        
                
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