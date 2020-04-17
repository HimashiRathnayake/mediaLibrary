import React from 'react';
import {ImageBackground} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import {getFolders} from "../api/folder";
import { FolderDisplayer } from '../commons/FolderDisplayer';

export const FolderScreen = ({route,navigation}) => {
    const [folders, setFolders] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [refresh,setRefresh] = React.useState(false);
    const type=route.params.type;

    React.useEffect(()=>{  
        getFolders({type:type})
        .then((response)=>{
            setCount(response.count);
            setFolders(response.folders);
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
    },[refresh])

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation} setRefresh={setRefresh} type={type}>{type} Folders</Header>
            <FolderDisplayer setRefresh={setRefresh} count={count} folders={folders} type={type} navigation={navigation}/>            
        </ImageBackground>
    );
}