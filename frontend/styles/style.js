import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: 'black',
  },
  registerBox: {
    width: '86%',
    backgroundColor: "rgba(186, 9, 9, 0.8)",
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(71, 5, 5, 1)",
  },
  inputBar: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "rgba(204, 47, 47, 1)"
  },
  inputBox: {
    marginVertical: 10,
  },
  logo: {
    width: '100%',
    height: 170,
    borderRadius: 10,
  },
  fullNameBox: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  halfNameBox: {
    flexDirection: 'column',
    width: '48%',
  },
  spacingBetweenNames: {
    width: '4%'
  },
  passwordInputField: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "rgba(204, 47, 47, 1)"
  },
  passwordInputBar: {
    width: '90%',
  },
  errorText: {
    color: "black",
    fontSize: 16,
    paddingBottom: 2
  }
});