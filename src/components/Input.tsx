import { StyleSheet, TextInput } from "react-native"


export function Input(){
    return(
        <TextInput style={styles.input}/>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: '100%',
        borderRadius: 15,
        backgroundColor: "#f1f1f1",
        fontSize: 15,
        paddingLeft:10,
        borderWidth: 1,
        borderColor: '#dddd'

    }
})
