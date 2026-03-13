import { Button, View } from "react-native"

import { useAuth } from "@/hooks/useAuth"

export default function Index() {
    const {signOut} = useAuth()


    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Button title="Saaaaaaaair" onPress={signOut}/>
        </View>
    )
}