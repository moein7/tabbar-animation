import *  as React from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'

interface Tab {
    name:string
}

interface StaticTabbarProps {
    tabs:Tab[];
    value: Animated.Value;
}


export const tabHeight = 50;
const { width } = Dimensions.get('window')


export default  class StaticTabbarr extends React.PureComponent<StaticTabbarProps>{


    values:Animated.Value[] = []
    constructor(props:StaticTabbarProps){
        super(props);
        const {tabs} = this.props;
        this.values = tabs.map((tabs, index)=> new Animated.Value(index === 0 ? 1 : 0))
    }

    onPress =(index:number) =>{
        const {value, tabs} = this.props;
        const tabWidth = width / tabs.length
        Animated.sequence([
            ...this.values.map(value=>Animated.timing(value,{
                toValue:0,
                duration:4,
                useNativeDriver:true,
            })),
            Animated.parallel([
                Animated.spring(this.values[index],{
                    toValue:1,
                    useNativeDriver:true,
                }),
                Animated.spring(value, {
                    toValue: -width + tabWidth * index,
                    useNativeDriver:true
                })
            ]),
        ]).start()
    }

    render(){
        const { tabs, value } =this.props;
        const tabWidth = width / tabs.length
       
        return(
            <View style={Styles.container}>
                {
                    tabs.map(({name}, key)=>{
                        const activeValues = this.values[key]
                        const opacity = value.interpolate({
                            inputRange:[-width +tabWidth *(key-1), -width +tabWidth *key, -width +tabWidth *(key+1)],
                            outputRange: [1,0,1],
                            extrapolate:"clamp"
                        });
                        const translateY =activeValues.interpolate({
                            inputRange:[0,1],
                            outputRange:[tabHeight, 0]
                        })
                        return(
                                <React.Fragment {...{key}}>
                                   
                                    <TouchableWithoutFeedback onPress ={()=>this.onPress(key)}>
                                        <Animated.View style={[Styles.tab,{ opacity }]}>
                                            <Icon size={25} {...{name}} />
                                        </Animated.View>
                                    </TouchableWithoutFeedback>
                                    <Animated.View
                                        style={{
                                            position:"absolute",
                                            top:-8,
                                            width:tabWidth, 
                                            left:tabWidth*key, 
                                            height:tabHeight,
                                            justifyContent:"center",
                                            alignItems:"center",
                                            transform:[{translateY}]
                                    }}
                                    >
                                        <View
                                            style={Styles.circle}
                                        >
                                            <Icon size={25} {...{name}} />
                                        </View>
                                    
                                    </Animated.View>
                                </React.Fragment>
                            )
                    })
                }
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:tabHeight
    },
    tab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    circle:{
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center"
    }
})

