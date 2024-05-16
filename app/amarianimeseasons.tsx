
import { useState } from "react";
import { moviekeys } from "./moviekeys";
import axios from "axios";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View,Text,Image, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
export default function AmariAnimeSeasons(){
    const navigate = useNavigation();
    const router = useRouter();

    const {series,film_name,poster_path}:any  = useLocalSearchParams();
    console.log(film_name)

    const [seasons,setSeasons] = useState([])
    const [description,setDescription] = useState("");


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
        //console.log(film)
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/${film_name}?page=1`,config)
        let result = response.data
        let seasons = result.results
        console.log(seasons)
        seasons.sort(function(a:any,b:any) {
         
            let bval = parseInt(b.releaseDate.replace(/^\D+/g, '').trim())
            let aval = parseInt(a.releaseDate.replace(/^\D+/g, '').trim())
            return aval- bval 
        })
       // console.log(seasons)
        //`https://image.tmdb.org/t/p/original/${season.poster_path}`
        setSeasons(seasons)
        //setNumOfEpisodes(result.number_of_episodes)
        //let seasons = result.seasons
        //seasons = reorderpecials(seasons)
        //setSeasons(seasons)
        setDescription(result.overview)
        
    }
    const navepisodes = async (id:any,season_name:any) =>{
        console.log(season_name,"hey")
        router.push({ pathname: "/amarianimeepisodes", params: {"animeid":id,"film_name":film_name,"poster_path":poster_path,"season_name":season_name}});
     


    }
    useEffect(() =>{
        getfilmdetails()
        
    },[])
    return(
        <View style={{backgroundColor:"#1e1e1e",flex:1}}>
            <TouchableOpacity onPress={() =>{router.push("/anime")}}>
            <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <StatusBar hidden/>
            <View style={{position:"relative",top:50,flex:1}}>
            <View style={{flex:0.6,justifyContent:"center",alignItems:"center",flexDirection:"column",gap:2}}
            >

                <Text style={{color:"white"}}>{film_name}</Text>
                <TouchableOpacity onPress={() =>{router.push("/anime")}}>
                <Image  src={`https://image.tmdb.org/t/p/original/${poster_path}`} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                </TouchableOpacity>
                <Text style={{color:"white",margin:30,width:300}}>{description}</Text>
                {/*
                <View>
                    
                    <a onClick={() =>{window.open(`https://anix.to/filter?keyword=${film_name}`)}} style={{color:"white",cursor:"pointer"}}>
         
                        <VideocamIcon style={{fontSize:"30px"}}/>
                        
                        <ArrowForwardIcon/>
                    </a>
                    { usetorrentanime === false ?
                    <a onClick={() =>{setUseTorrentAnime(true)}}>
                    <Image style={{width:"50px",height:"50px",cursor:"pointer",marginLeft:"30px"}} src={VortexBlankLogo}></Image>
                    </a>:
                    <a onClick={() =>{setUseTorrentAnime(false)}}>
                    <Image style={{width:"50px",height:"50px",cursor:"pointer",marginLeft:"30px"}} src={VortexLogo}></Image>
                    </a>
                    }

                    
                </View>*/}

 

            </View>  
            <FlatList
            numColumns={2}
            style={{flex:1}}
            
            
            columnWrapperStyle={{    flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',gap:20}}

            data={seasons}
            renderItem={({item,index}:any)=>{
                let season = item
                return(
                    <View style={{flexDirection:"column"}}>
                    <TouchableOpacity onPress={() =>{navepisodes(season.id,season.title)}}>
                    <Image src={season.image} style={{width:150,height:250,cursor:"pointer",borderRadius:5}}></Image>
                    <Text style={{marginTop:4,color:"white",width:150}}>{season.title}</Text>
                    <Text style={{width:100,color:"white"}}>Release Date: {season.releaseDate}</Text>
                    <Text style={{color:"white"}}>Sub/Dub: {season.subOrDub.toUpperCase()}</Text>

                    </TouchableOpacity>


                </View>
                )
            }}>

            </FlatList>







        </View>
            


        </View>
    )
}