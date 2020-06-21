import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '90%',
        backgroundColor: '#F5F5F5'
    },
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    floatingButton: {
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    main: {
        height: '90%'
    },
    footer: {
        height: '10%'
    }
})

export default styles;
