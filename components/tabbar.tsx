import *  as React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Animated } from 'react-native';
import Svg,{ Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import StaticTabbarr, {tabHeight as height}  from './StaticTabbar'


const { width } = Dimensions.get('window')

const tabs =[
    {name:'grid'},
    {name:'anchor'},
    {name:'archive'},
    {name:'bold'},
    {name:'list'},

]

const tabWidth = width / tabs.length


const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const left = shape.line()
            .x(d => d.x)
            .y(d => d.y)([
                {x:0, y:0},
                {x: width, y:0}
            ])
const tab = shape.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(shape.curveBasis) ([
                {x:width, y:0},
                {x: width + 5, y:0},
                {x: width + 10, y:10},
                {x: width + 15, y:height},
                {x: width + tabWidth - 15, y:height},
                {x: width + tabWidth - 10, y:10},
                {x: width + tabWidth - 5, y:0},
                {x: width + tabWidth , y:0},
            ])
const right = shape.line()
            .x(d => d.x)
            .y(d => d.y)([
                {x: width + tabWidth, y:0},
                {x: width * 2.5, y:0},
                {x: width * 2.5, y:height},
                {x: 0, y:height},
                {x: 0, y:0},
            ])

const d = `${left} ${tab} ${right}`;
interface TabbarProps {}

export default  class Tabbar extends React.PureComponent<TabbarProps>{

    value = new Animated.Value(-width)

    render(){
        const { value:translateX } =this;
        return(
            <>
                <View {...{width, height}}>
                    <AnimatedSvg
                        style={{transform:[{translateX}]}}
                        width={width*2.5} 
                        {...{height}}>
                        <Path {...{ d }} fill='#fff' />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <StaticTabbarr value={translateX} {...{ tabs }} />
                    </View>
                </View>
                <SafeAreaView style={Styles.safeArea}/>
            </>
        )
    }
}

const Styles = StyleSheet.create({
    safeArea:{
        backgroundColor:'#fff',
        height:20
    }
})

