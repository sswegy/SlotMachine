import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  registerBox: {
    width: '80%',
  },
  inputBar: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    marginVertical: 5,
  },
  inputBox: {
    marginVertical: 10,
  },
  logo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  fullNameBox: {
    flexDirection: 'row'
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
    borderRadius: 4,
    marginTop: 5,
  },
  passwordInputBar: {
    width: '90%',
  },
  errorText: {
    color: "maroon",
    fontSize: 16,
    paddingBottom: 2
  }
});