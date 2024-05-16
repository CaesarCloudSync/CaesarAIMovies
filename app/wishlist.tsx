import { useState } from "react";
import { moviekeys } from "./moviekeys";
import axios from "axios";
import { useEffect } from "react";
import Wish from "@/components/wishlistcomponents/wish";
import { View,Text,FlatList } from "react-native";
import Header from "@/components/header/header";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
export default function Wishlist(){
    const navigation = useNavigation();
    const [wishlist,setWishlist] = useState([]);

    const [seasons,setSeasons] = useState([])
    const [description,setDescription] = useState("");
    const [number_of_episodes,setNumOfEpisodes] = useState(0)
    const getfilmdetails = async () =>{
    
        const response = await axios.get("https://amarimovieswishlist-qqbn26mgpa-nw.a.run.app/getallwishlist")
        let result = response.data

        if ("message" in result){
            setWishlist(result.message)
        }
    }

    useEffect(() =>{
        getfilmdetails()
        
    },[wishlist])
    return(
        <View style={{backgroundColor:"#141212",flex:1,justifyContent:"center",alignItems:"center"}}>
            <StatusBar hidden/>
           <TouchableOpacity onPress={() =>{navigation.goBack();}} style={{alignSelf:"flex-start"}}>
                <AntDesign name="arrowleft" size={30} color="white" />
           </TouchableOpacity>
            
            <View style={{flex:0.05}}>
                <Text style={{color:"white",fontSize:25}}>Wishlist</Text>
            </View>
            <FlatList
            numColumns={2}
            style={{flex:1}}
            
            
            columnWrapperStyle={{    flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',gap:20}}

            data={wishlist}
            renderItem={({item,index}:any) => {
                let wish = item
                //console.log(wish)
                    return (
                        <Wish key={wish.themoviedbid} wishlist={wishlist}setWishlist={setWishlist}  themoviedbid={wish.themoviedbid} broadcasttype={wish.broadcasttype}/>
                    )
            }
        }

            />










        </View>
    )
}