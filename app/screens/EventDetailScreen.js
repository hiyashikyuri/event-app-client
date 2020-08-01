import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FooterTabs from '../components/Footer';
import { Container } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { apiImagePath } from "../shared/config";


export default function EventDetailScreen(props) {
    const { navigation } = props;

    // propsの中にあるnavigationからevent情報を取得
    const event = navigation.getParam('event', null);

    // 中身を表示させるまでにローディングを表示させることが可能
    const [isLoading, setIsLoading] = useState(false);

    // View部分
    return (
        <Container style={ styles.wrapper }>
            <ScrollView style={ styles.main }>
                <View style={ [styles.contentHeader] }>
                    { event.image?.url && <Image source={ { uri: apiImagePath + event.image.url } } style={ styles.image }/> }
                    <View style={ [styles.content, { flexDirection: 'row', flexWrap: 'wrap' }] }>
                        <MaterialIcons style={{ marginRight: 20 }} name="event-note" size={ 40 } color="white"/>
                        <Text style={ styles.title }>{ event.title }</Text>
                    </View>

                </View>
                <View>
                    <Text style={ styles.user }>
                        <Text>
                            <MaterialIcons name='person' style={ styles.icon } size={ 12 } color='black'/>
                        </Text>
                        <Text>
                            { event.user.name }
                        </Text>
                    </Text>
                </View>

                <Text style={ styles.body }>{ event.body }</Text>

                <Text style={ styles.address }>
                    <Text>
                        <FontAwesome name="map-marker" size={16} color="black" />
                    </Text>
                    <Text>{ event.address }</Text>
                </Text>

            </ScrollView>
            <View style={ styles.footer }>
                <FooterTabs navigation={ navigation }/>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10
    },
    textInput: {
        height: 60,
        width: 300,
        paddingLeft: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        margin: 30
    },
    image: {
        width: '100%',
        height: 200,
    },
    contentHeader: {
        backgroundColor: '#92BBD9',
        height: 200,
    },
    content: {
        position: 'absolute',
        left: 20,
        bottom: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 33,
        fontFamily: 'Helvetica Neue',
        color: '#fff',
        borderTopWidth: 1,
        borderColor: 'rgba(212,211,211, 0.3)',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    body: {
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        lineHeight: 18
    },
    address: {
        padding: 20,
        lineHeight: 18
    },
    user: {
        marginTop: 10,
        textAlign: 'right',
        textAlignVertical: 'top'
    },
    wrapper: {
        backgroundColor: '#F5F5F5',
    },
    main: {
        margin: 10,
        backgroundColor: '#F5F5F5',
        height: '90%'
    },
    footer: {
        height: '10%'
    }
});
