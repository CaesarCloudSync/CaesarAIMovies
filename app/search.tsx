import { TextInput, View ,FlatList,Text,TouchableOpacity,Image} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MangaCover from "@/components/homecomponents/MangaCover";
import NavigationFooter from "./footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { useNetInfo } from "@react-native-community/netinfo";
import Header from "@/components/header/header";
import { moviekeys } from "./moviekeys";
import MovieCard from "@/components/moviecard/moviecard";
import { useLocalSearchParams } from "expo-router";
export default function Search(){
    const netInfo = useNetInfo();
    const [text,setText] = useState("");
    const [searchpagecarousel,setSearchPageCarousel] = useState([0,1,2,3])
    const [searchresults,setSearchResults] = useState([]);
    const [searchpagenum,setSearchPageNum] = useState(1);
    const [recentremoved,setRecentRemoved] = useState(false)
    const [moviesearchquery,setMovieSearchQuery] = useState("");
    const [pagenum,setPageNum] = useState(1)
    const {mediatype} = useLocalSearchParams();
    const [mediatypename,setMediaTypeName] = useState(!mediatype ? "tv":mediatype)
 


    const getsearchresults = async (usingcarousel=false) =>{

        if (moviesearchquery !== ""){
            const config = {
                headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
            };
            
            const response = await axios.get(`https://api.themoviedb.org/3/search/${mediatypename}?query=${moviesearchquery}&language=en-US&page=${searchpagenum}`,config)
            let result = response.data
    
            if (result.results.length > 0){
            setSearchResults(result.results)
            if (usingcarousel === false){
                /*navigate({
                    pathname: '/amarimovies',
                    search: `?page=${pagenum}`,
                    hash:"#search_results"
                  });
                  router.push({ pathname: "/", params: {"page":pagenum}});*/
            }

            }
            
        }

    }
    const searchnavleft = () =>{
        if (searchpagenum !== 1){
            setSearchPageNum(searchpagenum -1)
        }
    }
    const searchnavright = () =>{
        setSearchPageNum(searchpagenum +1)
    }
    const seacrhnavpick = (index:any) =>{
        if (pagenum !== index){
            //console.log("ho",index)
            setSearchPageNum(index)
        }


    }
    


     useEffect(() =>{
        if (searchresults.length === 0){
            if (netInfo.isInternetReachable === true){
            getsearchresults(true)
        }
        }
     },[netInfo,searchpagenum])
     if (netInfo.isInternetReachable === true){
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
                <StatusBar  hidden/>
                <View style={{justifyContent:"center",alignItems:"center",marginTop:10,flexDirection:"row"}}>
                
                <View style={{height:30,borderTopLeftRadius:5,borderBottomLeftRadius:5,backgroundColor:"white",justifyContent:"center",padding:3}}>
                    <AntDesign name="search1" size={20} color="black" />
                </View>
        
                <TextInput
                        onSubmitEditing={() =>{getsearchresults()}}
                        placeholder="What manga would you like to read?"
                        placeholderTextColor={'black'}
                        
                        style={ {
                            height: 30,
                            width:"70%",
                        
                            
                            borderBottomRightRadius:5,borderTopRightRadius:5,
        
                            backgroundColor:"white",
                            color:"black"
                        }}
                        onChangeText={setMovieSearchQuery}
                        value={moviesearchquery}
                    />
                <View style={{backgroundColor:"blue",borderTopRightRadius:2,borderBottomRightRadius:2,height:30}}>
                    <TouchableOpacity onPress={() =>{getsearchresults()}} >
                        <Text>
                            Right
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            {searchresults.length === 0 && <View style={{flex:1}}></View>}
            {searchresults.length !== 0 &&
            
            <FlatList
            numColumns={2}
            style={{flex:1}}
            
            
            columnWrapperStyle={{    flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',gap:20}}

            data={searchresults}
            renderItem={({item,index}:any) => {
                let film = item
                    return (
                        <MovieCard key={index} film={film}/>
                    )
            }
        }

            />}
        <NavigationFooter style={{flex:0.1}} currentpage={"search"}/>
        </View>
    )
}
else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
        <StatusBar  hidden/>
        {searchresults.length !== 0 &&
        <TouchableOpacity onPress={() =>{setSearchResults([])}} style={{alignSelf:"flex-end"}}>
        <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>}

        <View style={{ flex:0.1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <View style={{height:30,borderTopLeftRadius:5,borderBottomLeftRadius:5,backgroundColor:"white",justifyContent:"center",padding:3}}>
            <AntDesign name="search1" size={20} color="black" />
        </View>
        
        <TextInput
        
        placeholder="What manga would you like to read?"
        placeholderTextColor={'black'}
        
        style={ {
            height: 30,
            width:"70%",
           
            
            borderBottomRightRadius:5,borderTopRightRadius:5,

            backgroundColor:"white",
            color:"black"
          }}
        onChangeText={setText}
        value={text}
    />
    <View style={{flex:0.13,marginLeft:15}}>
        <Image style={{width:44,height:39}} source={require("./CaesarAIMangaLogo.png")} />
        </View>
    </View>



{<View style={{flex:1}}></View>}
{/*searchresults.length === 0 && <View style={{flex:1}}></View>*/}
<NavigationFooter style={{flex:0.1}} currentpage={"search"}/>
</View>
    )

}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"#141212",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Read your Downloads
                </Text>
            </View>



            {/*Navigation Footer*/}
            <NavigationFooter currentpage={"search"}/>

        </View>
    )
    
}
}