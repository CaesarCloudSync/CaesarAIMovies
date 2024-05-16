import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { moviekeys } from "./moviekeys";
import axios from "axios";
import { useEffect } from "react";
import Episode from "@/components/seriescomponent/episode";
import { Image, View,Text,FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
export default function AmariEpisodes(){
    const navigation = useNavigation();
    const {series_name,seriesid,original_language,poster_path} = useLocalSearchParams();
    const [seasons,setSeasons] = useState([])
    const [description,setDescription] = useState("");
    const [number_of_episodes,setNumOfEpisodes] = useState(0)

    const reorderpecials = (seasons:any) => {
        let specials = []
        for(var i = 0; i < seasons.length; i++) {
            if (seasons[i].name.includes("Special")){
    
                var index = seasons.indexOf(seasons[i]);
                if (index !== -1) {
                    specials.push(seasons[i])
                    seasons.splice(index, 1);
                    
                  }
            }
        }
        
        return seasons.concat(specials)

    }
    const getfilmdetails = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        }; 
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesid}?language=en-US`,config)
        let result = response.data
        ////console.log(result)
        setNumOfEpisodes(result.number_of_episodes)
        let seasons = result.seasons
        seasons = reorderpecials(seasons)
        setSeasons(seasons)
        setDescription(result.overview)
        
    }
    useEffect(() =>{
        getfilmdetails()
        
    },[])
    return(
        <View style={{backgroundColor:"#1e1e1e",flex:1}}>
            <StatusBar hidden/>
            <View style={{flex:0.04}}>
                <TouchableOpacity onPress={() =>{navigation.goBack()}}>
                <AntDesign name="arrowleft" size={30} color="white" />
                </TouchableOpacity>

            </View>

            <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:20}}
            >

                <Text style={{color:"white"}}>{series_name}</Text>
                <Text style={{color:"white",margin:30}}>{description}</Text>
                <Text style={{color:"white"}}>Number of Episodes: {number_of_episodes}</Text>


 

            </View>  
            <FlatList
                    numColumns={2}
                    style={{flex:1}}
                    
                    contentContainerStyle={{gap:20}}
                    columnWrapperStyle={{    flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',gap:20}}

                    data={seasons}
                    renderItem={({item,index}:any) => {
                        let season = item
                            return (
                                <View style={{display:"flex",flexDirection:"column"}}>
                                <Image src={`https://image.tmdb.org/t/p/original/${season.poster_path}`} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                                <Text style={{marginTop:4,color:"white"}}>{season.name}</Text>
                                <Text style={{width:100,color:"white"}}>Release Date: {season.air_date}</Text>
                                <Text style={{color:"white"}}>Rating: {season.vote_average}</Text>
                                <FlatList
                                    numColumns={3}
                                    style={{flex:1,marginTop:10}}
                                    
                                    ItemSeparatorComponent={() => (
                                        <View style={{  height: 5 }} />
                                      )}
                                    
                                    columnWrapperStyle={{    flexGrow: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',gap:20}}

                                    data={[...Array(season.episode_count).keys()]}
                                    renderItem={({item,index}:any) => {
                                        let episode= item
                                            return (
                                                <Episode season_number={season.season_number} seriesid={seriesid} episode={episode}/>
                                            )
                                    }
                                }

                                    />
  

                            </View>
                            )
                    }
                }

                    />








        </View>
    )
}