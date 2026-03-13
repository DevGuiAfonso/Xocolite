import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type ButtonProps = {
  icon?: React.ReactNode
  text: string
  textColor?: string
  color?: string
  onPress?: () => void
}

export function Button({ 
  icon,
  text,
  textColor = "#fff",
  color = "#333",
  onPress
   }: ButtonProps) {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }]}>
      
      {icon && <View style={styles.icon}>{icon}</View>}

      <Text style={[styles.text, { color: textColor }]}>
        {text}
      </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 17,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    icon: {
        position: "absolute",
        left: 15
    },

    text: {
        fontSize: 16
    },

})