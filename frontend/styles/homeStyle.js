import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
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
        height: 40
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
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
    }
});