// import React from 'react';
// import {Text, View, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
// import {stylesScreen} from '../styles/folderStyles';
// import {Formik} from 'formik';
// import {createFolder, renameFolder} from "../api/folder";

// export const RenameModal = ({modalVisible, setVisible, type, folderId, setRefresh, actionType}) => {

//     function rename(fileName){
//         if (fileName===''){
//             Alert.alert('You have to enter a name in order to rename the image','',[{text:'OK'}]);
//             }else{
//                 renameImage({name:folderName, folderId:folderId})
//                 .then((response)=>{
//                     if (response.message==="Folder renamed successfully"){
//                         setRefresh(true);
//                     }
//                     else{
//                         Alert.alert('Alert','Something Went wrong',[{text:'OK'}]);
//                         setRefresh(true);
//                     }
//                 }).catch((error)=>{
//                     console.log(error);
//                 })       
//             }
//         }
//     return(
//         <Modal style={stylesScreen.modal} transparent={true} animationType='fade' visible={modalVisible} onRequestClose={()=>{}}>
//             <View style={stylesScreen.modal}>
//                 <Formik 
//                     initialValues={{folderName:''}}
//                     onSubmit={
//                         (values)=>{
//                             setVisible(false);
//                             let folderName=values.folderName
//                             startAction(folderName);                                 
//                     }}
//                 >
//                     {(props)=>(
//                     <View style={stylesScreen.modalView}>
//                         {actionType==='Create' && <Text style={stylesScreen.inputHeader}>Folder Name</Text>}
//                         {actionType==='Rename' && <Text style={stylesScreen.inputHeader}>Rename Folder</Text>}
//                         <TextInput 
//                             style={stylesScreen.input} 
//                             placeholder={actionType==='Create'?'Enter Name':'Enter New Name'}
//                             placeholderTextColor="#9e9e9e" 
//                             onChangeText={props.handleChange('folderName')}
//                             value={props.values.folderName}
//                         />
//                         <View style={stylesScreen.bottom}>
//                             <TouchableOpacity onPress={()=>{setVisible(false)}}><Text style={stylesScreen.text}>Close</Text></TouchableOpacity> 
//                             <TouchableOpacity onPress={()=>{props.handleSubmit();}}>
//                                 {actionType==='Create' && <Text style={stylesScreen.text}>Create</Text>}
//                                 {actionType==='Rename' && <Text style={stylesScreen.text}>Rename</Text>}
//                             </TouchableOpacity>
//                         </View>
//                     </View>)}
//                 </Formik>
//             </View>
//         </Modal>
//     );
// }
