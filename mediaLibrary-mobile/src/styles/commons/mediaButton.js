import { StyleSheet } from 'react-native';

export const styles=StyleSheet.create({
    container:{
        flexDirection:'row', 
        alignContent:'center', 
        backgroundColor:'#9e9e9e',
        width:'60%', 
        height: 60,
        alignSelf:'center', 
        padding:5, 
        borderRadius: 30,
        marginBottom: 30,
        shadowOpacity: 10
    },
    buttonView: {
        marginRight:20,
    },
    icon:{
        color:'#1976d2',
        fontSize: 40 ,
        marginLeft: 20  
    },
    text: {
        fontSize:20,
        fontWeight: 'bold',
        color:'#1976d2',
        marginTop: 10
    }
});