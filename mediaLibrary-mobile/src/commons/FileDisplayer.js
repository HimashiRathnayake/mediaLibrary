import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {ImageModal} from '../modals/ImageModal';
import { AudioModal } from '../modals/AudioModal';
import {stylesScreen} from '../styles/allImageScreen';

export const FileDisplayer = ({type, files, count})=>{

    const [modelVisible, setVisible] = React.useState(false);
    const [modelFile, setFile] = React.useState(null);

    function setModelVisible(visible, fileKey){
        setFile(files[fileKey]);
        setVisible(visible);
    }
    
    const fileSet = files.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{setModelVisible(true, key)}}>
                <View style={stylesScreen.imagewrapper}>
                    <Image source={{uri:val.path}} style={stylesScreen.image}/>
                </View>
            </TouchableOpacity>
        )
    })

    if (count===0){
        return(
            <View style={stylesScreen.noImageContainer}>
                <Text style={stylesScreen.noImageText}>No {type}s found</Text>
            </View>
        );
    }else if (modelFile!==null){
        return(<ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    {type==='Image' && <ImageModal modelImage={modelFile} modelVisible={modelVisible} setVisible={setVisible}/>}
                    {type==='Audio' && <AudioModal visible={modelVisible} setVisible={setVisible} audio={modelFile}/>}
                    {fileSet}
                </View>
            </ScrollView>)
    }else{
        return(<View></View>);
    }
}