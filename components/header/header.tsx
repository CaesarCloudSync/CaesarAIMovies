import { View ,Text} from "react-native";
import { Image } from "react-native";
export default function Header({style}:any){
    return(

                   
            <View  style={{flex:0.08,flexDirection:"row",backgroundColor:"#141212"}}>
            <View style={{flex:1,margin:10}}>
            <Text style={{fontSize:20,color:"white"}}>CaesarAIMovies</Text>
            
            </View>
            <View style={{flex:0.13,margin:10}}>
            <Image style={{width:44,height:39}} source={require("./CaesarAIMangaLogo.png")} />
            </View>

        </View>
    )
}