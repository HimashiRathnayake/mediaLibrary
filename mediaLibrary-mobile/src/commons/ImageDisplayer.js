import React, { useState } from 'react';
import {Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Modal} from 'react-native';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageModal} from '../modals/ImageModal';

export const ImageDisplayer = ({setRefresh, images, count, shouldMove}) => {

    const [modelVisible, setVisible] = useState(false);
    const [modelImage, setImage] = useState(null);
    const [index, setIndex] = useState(0);
    const [actionModalVisible, setActionModalVisible] = useState(false);

    async function setModelVisible(visible, imageKey){
        await setIndex(imageKey);
        await setImage(images[imageKey]);
        setVisible(visible);
    }

    React.useEffect(()=>{  
        if (modelImage!==null){
            setModelVisible(modelVisible, index)
        }
    },[images])
    
    const imageSet = images.map((val,key)=>{
        return(
            <TouchableOpacity key={key} 
                onPress={()=>{setModelVisible(true, key)}}
                onLongPress={()=>(shouldMove!==undefined)? setActionModalVisible(true) :{}}
            >
                <View style={stylesScreen.imagewrapper}>
                    <Image source={{uri:val.path}} style={stylesScreen.image}/>
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <View>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Text style={stylesScreen.noImageText}>No images found</Text>
                </View>
                ):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container}>
                        {(modelImage !== null) && (
                            <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible} setRefresh={setRefresh}/>
                        )}
                        {imageSet}
                    </View>
                </ScrollView>)
            }

                <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{}}>
                    <TouchableWithoutFeedback onPress={()=>setActionModalVisible(false)}>
                        <View style={stylesScreen.folderActionModal}>
                            <View style={stylesScreen.modalContainer}>
                                <TouchableOpacity onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
                                    <Text style={stylesScreen.modalText}>Rename</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>deletefolder(modalFolder)}>
                                    <Text style={stylesScreen.modalText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>alert('fgh')}>
                                    <Text style={stylesScreen.modalText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

        </View>
    )
}
