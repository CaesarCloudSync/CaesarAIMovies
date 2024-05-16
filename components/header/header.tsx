import { useRouter } from "expo-router";
import { View ,Text} from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
export default function Header({style}:any){
    const router = useRouter();
    return(

                   
            <View  style={{flex:0.08,flexDirection:"row",backgroundColor:"#141212"}}>
            <View style={{flex:1,margin:10}}>
            <Text style={{fontSize:20,color:"white"}}>CaesarAIMovies</Text>
            
            </View>
            <View style={{flex:0.13,margin:10}}>
            <TouchableOpacity onPress={()=>{router.push("/wishlist")}}>
                <Image style={{width:44,height:39}} source={require("./CaesarAIMoviesLogo.png")} />
            </TouchableOpacity>
            </View>

        </View>
    )
}