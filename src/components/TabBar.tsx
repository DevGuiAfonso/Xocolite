import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Colors } from "@/global/color";
import { CartLarge, Home, PerfilIcon } from "./Icons";



export function TabBar({ state, navigation }: any) {
    const tabs = [
        { key: "index", label: "Início", icon: <Home /> },
        { key: "cartLarge", label: "Carrinho", icon: <CartLarge /> },
        { key: "perfil", label: "Perfil", icon: <PerfilIcon /> },
    ];
    return (
        <View style={styles.tabBar}>
            {tabs.map((tab) => {
                const isActive = state.routes[state.index].name === tab.key;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tabItem}
                        onPress={() => navigation.navigate(tab.key)}
                    >
                        <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                            {tab.icon}
                        </Text>

                        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',

        flexDirection: "row",
        backgroundColor: "#000",
        paddingBottom: 8,
        paddingTop: 10,
        borderRadius: 100,
        width: 280,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    tabIcon: {
        fontSize: 22,
        opacity: 0.5,
    },
    tabIconActive: {
        opacity: 1,
    },
    tabLabel: {
        color: Colors.text.muted,
        fontSize: 11,
    },
    tabLabelActive: {
        color: Colors.text.primary,
        fontWeight: "600",
    },
})