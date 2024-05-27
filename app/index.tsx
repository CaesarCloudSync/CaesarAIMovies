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
import { AntDesign } from '@expo/vector-icons';
import { useNetInfo } from "@react-native-community/netinfo";
export default function AmariMovies(){
    const netInfo = useNetInfo();

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
        
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagenum}`,config)
        let result = response.data
        ////console.log(result)
        setUpcomingFilms(result.results)
        const responsewakeup = await axios.get(`https://caesaraiconsumet.fly.dev`)
    }



    const navleft = () =>{
        if (pagenum !== 1){
            setPageNum(pagenum-1)
            router.push({ pathname: "/", params: {"page":pagenum-1}});

        }

    }
    const navright = () =>{
        ////console.log("hi",pagenum)
        setPageNum(pagenum+1)
        router.push({ pathname: "/", params: {"page":pagenum+1}});


    }
    const navpick = (index:any) =>{
        if (pagenum !== index){
            ////console.log("ho",index)
            setPageNum(index)
            router.push({ pathname: "/", params: {"page":index}});

        }


    }


    useEffect(() =>{
        if (netInfo.isInternetReachable === true){
            getupcomingfilms()
        }
    },[netInfo,pagenum])

    
    
if (netInfo.isInternetReachable === true){
    return(
        <View style={{flex:1,backgroundColor:"#141212"}}>
            <StatusBar hidden/>
            <Header/>

            <View style={{flex:0.13,justifyContent:"center",alignItems:"center",flexDirection:"column",gap:30}}>
  

                    <Text style={{color:"white",fontSize:20}}>Amari Movies</Text>
                    <View style={{flexDirection:"row",gap:10}}>
                        <TouchableOpacity style={{backgroundColor:"blue",borderRadius:5,padding:5}}><Text style={{color:"white"}}>Movies</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() =>{router.push("/anime")}}   ><Text style={{color:"white",padding:5}}>Anime</Text></TouchableOpacity>
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
                        <MovieCard key={index} film={film}/>
                    )
            }
        }

            />
            <NavigationFooter style={{flex:0.1}} currentpage={"home"} mediatype={"movie"}/>


        </View>

    )
}

else if (netInfo.isInternetReachable === null){
    return(
        <View style={{flex:1}}>
            <StatusBar hidden/>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"#141212",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Watch your Downloads
                </Text>
            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter style={{flex:0.1}} currentpage={"home"}/>

        </View>
    )
}
else if (netInfo.isInternetReachable === false){
    return(
        <View style={{flex:1}}>
            <StatusBar hidden/>
            {/*Header */}
            <Header style={{flex:1}}/>
            {/* No Internet Main Body */}
            <View style={{flex:1,backgroundColor:"#141212",justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30,color:"white"}}>No Internet Connection</Text>
                <Text style={{color:"white"}}>
                Watch your Downloads
                </Text>
            </View>
            



            {/*Navigation Footer*/}
            <NavigationFooter style={{flex:0.1}} currentpage={"home"}/>

        </View>
    )
    
}
}