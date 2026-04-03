import { Colors } from "@/global/color";
import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CartLarge, Search } from "./Icons";


export const Header = () => (
    <View style={styles.header}>
        <View>
            <Text style={styles.headerTitle}>O que vai querer{"\n"}de chocolate hoje?</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/(tabs)/cartLarge")}>
            <Text style={styles.cartIcon}><CartLarge /></Text>
        </TouchableOpacity>
    </View>
);


type SearchBarProps = {
    value: string;
    onChange: (text: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <View style={styles.searchWrapper}>
        <Text style={styles.searchIconText}><Search /></Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar chocolates..."
            placeholderTextColor="#8a6a4a"
            value={value}                //  controla o valor
            onChangeText={onChange}      
        />
    </View>
);


const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    greeting: {
        color: Colors.text.muted,
        fontSize: 14,
        marginBottom: 4,
    },
    headerTitle: {
        color: Colors.text.primary,
        fontSize: 22,
        fontWeight: "700",
        lineHeight: 28,
    },
    cartButton: {
        backgroundColor: Colors.brown.card,
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    cartIcon: {
        fontSize: 20,
    },

    // Search
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.brown.mid,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 14,
    },
    searchIconText: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: Colors.text.primary,
        fontSize: 15,
    },
})