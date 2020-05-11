import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

export const ToolTip = ({content, children, onPress, dark}) => {
    const [toolTip, setToolTip] = useState(false);
    return(
    <View>
        <Tooltip 
            backgroundColor={"rgba(0,0,0,0.5)"}
            arrowSize={{width:16, height:8}} 
            isVisible={toolTip} 
            content={<Text style={{color:'#fff'}}>{content}</Text>} 
            placement="bottom" 
            onClose={()=>setToolTip(false)}
            contentStyle={{backgroundColor:dark?'rgba(128,128,127,0.6)':'#242424'}}
        >
            <TouchableOpacity onPress={onPress} onLongPress={()=>setToolTip(true)}>
                {children}
            </TouchableOpacity>
        </Tooltip>
    </View>
    )
}