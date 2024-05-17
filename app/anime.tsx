import axios from "axios"
import { moviekeys } from "./moviekeys"
import { useEffect, useState } from "react"

//import MovieCard from "./moviecard"
import Header from "@/components/header/header";

import { useRouter ,useLocalSearchParams,useNavigation} from 'expo-router';
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList,TextInput} from "react-native";
import MovieCard from "@/components/moviecard/moviecard";
import { StatusBar } from "expo-status-bar";
import NavigationFooter from "./footer";
import AnimeSeriesCard from "@/components/animeseriescard/animeseriescard";
import { AntDesign } from '@expo/vector-icons';
export default function AmariAnime(){

    const router = useRouter();
    const navigate = useNavigation()
    const [upcomingfilms,setUpcomingFilms] = useState([]);
    let {page}:any = useLocalSearchParams();
    let [pagenum,setPageNum] = useState(page === undefined ? 1:parseInt( page))
    
    const [pagecarousel,setPageCarousel] = useState([0,1,2,3])
    const [searchpagenum,setSearchPageNum] = useState(1);


    const getupcomingfilms = async () =>{
        const config = {
            headers: { Authorization: `Bearer ${moviekeys.read_access_token}` }
        };
        
        let final_date = "2015-03-10"
        // responsewakeup = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app`)
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?language=en-US&page=${pagenum}&with_genres=16&with_keywords=210024|287501&first_air_date.gte=${final_date}`,config)
        let result = response.data
        ////console.log(result)
        setUpcomingFilms(result.results)
    }
    useEffect(() =>{
        getupcomingfilms()
    },[])
    


    const navleft = () =>{
        if (pagenum !== 1){
            setPageNum(pagenum-1)
            router.push({ pathname: "/anime", params: {"page":pagenum-1}});

        }

    }
    const navright = () =>{
        ////console.log("hi",pagenum)
        setPageNum(pagenum+1)
        router.push({ pathname: "/anime", params: {"page":pagenum+1}});


    }
    const navpick = (index:any) =>{
        if (pagenum !== index){
            ////console.log("ho",index)
            setPageNum(index)
            router.push({ pathname: "/anime", params: {"page":index}});

        }


    }


    useEffect(() =>{
        getupcomingfilms()
    },[pagenum])

    
    
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <StatusBar hidden/>
            <Header/>

            <View style={{flex:0.13,justifyContent:"center",alignItems:"center",flexDirection:"column",gap:30,marginTop:20}}>
  

                    <Text style={{color:"white",fontSize:20}}>Amari Anime</Text>
                    <View style={{flexDirection:"row",gap:10}}>
                        <TouchableOpacity onPress={() =>{router.push("/")}} ><Text style={{color:"white",padding:5}}>Movies</Text></TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"blue",borderRadius:5,padding:4}}  ><Text style={{color:"white",padding:5}}>Anime</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() =>{router.push("/series")}} ><Text style={{color:"white",padding:5}}>Series</Text></TouchableOpacity>
                    </View>
                    
    

            </View>
            <View style={{flex:0.1,gap:20,justifyContent:"center",alignItems:"center",marginTop:20,flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{navleft()}}><AntDesign name="arrowleft" size={24} color="white" /></TouchableOpacity>
                {pagecarousel.map((index) =>{
                    return( <View style={{backgroundColor:index+ pagenum === pagenum ? "blue" :"transparent",borderRadius:5,padding:5}}><TouchableOpacity style={{cursor:"pointer"}} onPress={() =>{navpick(index+ pagenum)}}><Text style={{color:"white"}}>{index + pagenum}</Text></TouchableOpacity></View>)
                }) }
                <TouchableOpacity onPress={()=>{navright()}}><AntDesign name="arrowright" size={24} color="white" /></TouchableOpacity>
            </View>  


  
            <FlatList
            numColumns={2}
            style={{flex:1}}
            
            
            columnWrapperStyle={{    flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',gap:20}}

            data={upcomingfilms}
            renderItem={({item,index}:any) => {
                let film = item
                    return (
                        <AnimeSeriesCard key={index} film={film}/>
                    )
            }
        }

            />
            <NavigationFooter style={{flex:0.1}} currentpage={"home"} mediatype={"tv"}/>


        </View>

    )
}