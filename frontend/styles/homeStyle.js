import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: 'maroon'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
    balance: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 120,
        alignItems: 'center',
        height: 40,
        backgroundColor: "rgba(186, 29, 29, 1)",
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(100,100,100, 0.25)"
    },
    modalContainer: {
        borderWidth: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(186, 29, 29, 1)',
        padding: 5,
        width: '80%',
    },
    transactionTable: {
        flexGrow: 1,
        height: 200,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
    },
    transactionRow: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameContainer: {
        width: "90%",
        padding: 10,
        borderWidth: 3,
        borderRadius: 10,
    }, 
    utilityContainer: {
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        width: "90%",
        marginTop: "5%",
        height: 500,
        alignItems: 'center',
        backgroundColor: "rgba(186, 29, 29, 0.85)",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },
    selectedButton: {
        borderBottomWidth: 4,
        borderColor: "#D8B400",
        padding: 2
    },
    interactiveTables: {
        width: "100%",
        borderWidth: 3,
        flex: 1,
        marginTop: 15,
        borderRadius: 10,
    },
    logo: {
        width: "50%",
        height: 50
    },
    playerRow: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    currentPlayerRow: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        backgroundColor: 'rgba(10,190,10,0.4)',
        borderRadius: 6
    }
});