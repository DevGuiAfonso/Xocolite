import { Button } from "@/components/Buttons"
import { AppleIcon, FacebookIcon, GoogleIcon, PlusIcon } from "@/components/Icons"
import { useAuth } from "@/hooks/useAuth"
import { useFonts } from "expo-font"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, View } from "react-native"


export default function SignIn() {
    const {signIn} = useAuth()

    const [fontsLoaded] = useFonts({
        AKONY: require("../../assets/fonts/AKONY.ttf"),
    })

    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <LinearGradient
                    colors={["#c50202", "#3d1803"]}
                    style={styles.circle}
                >
                </LinearGradient>
                <View style={styles.header}>
                    <Text style={styles.title}>Xocolite</Text>
                </View>
                <View style={styles.line} />
            </View>

            <View style={styles.containerMidButtons}>
                <Button
                    icon={<GoogleIcon />}
                    text="Entrar com Google"
                    color="#000000" />

                <Button
                    icon={<AppleIcon />}
                    text="Entrar com Apple"
                    color="#ffffff"
                    textColor="#000000" />

                <Button
                    icon={<FacebookIcon />}
                    text="Entrar com Facebook"
                    color="#25007a"
                    textColor="#ffffff" />
            </View>

            <View style={styles.rowlineOu}>
                <View style={styles.lineOu} />
                <Text style={styles.textlineOu}>ou</Text>
                <View style={styles.lineOu} />
            </View>

            <View style={styles.contentBottomCreateButton}>
                <Button
                    icon={<PlusIcon />}
                    text="Criar sua conta"
                    color="#ffffff"
                    textColor="#000000" 
                    onPress={signIn}
                    />

                    <Text>Ao continuar, você aceita nossos Termos de Uso e Privacidade</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#180202",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        gap: 20,
    },

    topContainer: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
    },

    containerMidButtons: {
        gap: 20,
        width: "90%",
        height: "30%",
        justifyContent: "center",
    },

    contentBottomCreateButton: {
        gap: 20,
        width: "90%",
        height: "25%",
        justifyContent: "flex-start",
        paddingTop:35,
    },

    circle: {
        position: "absolute",
        top: -80,
        width: 350,
        height: 350,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "flex-end"
    },

    header: {
        alignItems: "center",
        marginTop: 20,
    },

    title: {
        fontFamily: "AKONY",
        fontSize: 60,
        color: "#fff",
    },

    line: {
        width: "100%",
        height: 2,
        backgroundColor: "#ccc",
        left: 150,
    },


    rowlineOu: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    textlineOu: {
        color: "#7c3004",
        fontSize: 22
    },

    lineOu: {
        width: "20%",
        height: 0.5,
        backgroundColor: "#7c3004"
    },


})  