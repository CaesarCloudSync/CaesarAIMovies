import { moviekeys } from "@/app/moviekeys";
import axios from "axios";

import { useEffect, useState } from "react";
import { View,Text, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from 'expo-file-system';
export default function Episode({episodeid,number,numeps,animeid,film_name,poster_path,season_image,season_name}:any){
    const router = useRouter();
    const [cookie_key,setCookieKey] = useState(`${episodeid}`)
    const [progress,setProgress] = useState({});
    const callback = (downloadProgress:any) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(progress)
        setProgress({
          downloadProgress: progress,
        });
      };

    //const [haswatchedcookie,setHasWatchedCookie] = useState(read_cookie(cookie_key))
    const getepisode = async () =>{
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${episodeid}?server=vidstreaming`);
        let result = response.data
        let video = result.sources.filter((source:any) =>{return(source.quality === "1080p")})[0]

  
        router.push({ pathname: "/videoepisode", params: {"animelink":video.url,"episodeid":episodeid,"numeps":numeps,"number":number,"animeid":animeid,"film_name":film_name,"poster_path":poster_path,"season_image":season_image,"season_name":season_name}});


    }
    const downloadepisode =async () => {
        const response = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/watch/${episodeid}?server=vidstreaming`);
        let result = response.data
        let download_link = result.download
        const responselinks = await axios.get(`https://caesaraianimeconsumet-qqbn26mgpa-uc.a.run.app/anime/gogoanime/download?link=${download_link}`)
        let resultlinks:any = responselinks.data
        if (resultlinks.length > 0){
            let video_download = resultlinks.filter((item:any) =>{return(item.source.includes("1080P"))})[0].link

            const downloadResumable = FileSystem.createDownloadResumable(
                video_download,
                FileSystem.documentDirectory + `${episodeid}.mp4`,
                {},
                callback
              );
              try {
                const { uri }:any = await downloadResumable.downloadAsync();
                console.log('Finished downloading to ', uri);
              } catch (e) {
                console.error(e);
              }
              let dir:any = FileSystem.documentDirectory
              let files = await FileSystem.readDirectoryAsync(dir);
              console.log(files)
              
            //console.log(video_download)
            
        }
        else{
            Alert.alert("Download link does not exist.")
        }
        
    }

    ////console.log(film.original_language)
    ////console.log(haswatchedcookie,"hi")
    return(
        <TouchableOpacity onLongPress={() =>{downloadepisode()}} onPress={() =>{getepisode()}} style={{display:"flex",backgroundColor:"white",opacity:1,borderRadius:5,height:30,width:30,justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
       
                <Text style={{color:"black"}}>{number}</Text>


        </TouchableOpacity>
    )
}

/*

        <View onClick={() =>{getepisode()}} style={{display:"flex",border:"1px solid black",backgroundColor:haswatchedcookie === "true" ? "blue":"white",opacity:haswatchedcookie === "true" ? "0.2":"1",borderRadius:"5px",height:"30px",width:"30px",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
            <a style={{color:haswatchedcookie === "true" ? "white":"black"}}>{number}</a>

            
        </View>*/