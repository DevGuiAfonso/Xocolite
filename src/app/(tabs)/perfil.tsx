import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/global/color";
 
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

import { BoxIcon, ChatIcon, Dollar, Favorite, FolhaICon, GlobalIcon, HelpIcon, LockIcon, LogoutIcon, MapPoint, Moon } from "@/components/Icons";
import {
  AvatarBlock,
  MenuItem,
  NotificationToggle,
  SectionLabel,
  StatsRow,
  USER
} from "@/components/SubComponents(profile)";





export default function Perfil() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0a00" />

      {/* Fixed header */}
      <View style={styles.fixedTop}>
        <Text style={styles.pageTitle}>Meu Perfil</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AvatarBlock />
        <StatsRow />

        {/* Conta */}
        <SectionLabel title="Conta" />
        <View style={styles.menuGroup}>
          <MenuItem icon={<BoxIcon/>} label="Meus Pedidos" />
          <MenuItem icon={<Favorite/>} label="Favoritos" value={`${USER.favorites} itens`} />
          <MenuItem icon={<MapPoint/>} label="Endereços" />
          <MenuItem icon={<Dollar/>} label="Pagamentos" />
        </View>

        {/* Preferências */}
        <SectionLabel title="Preferências" />
        <View style={styles.menuGroup}>
          <NotificationToggle />
          <MenuItem icon={<Moon/>} label="Tema Escuro" showArrow={false} />
          <MenuItem icon={<GlobalIcon/>} label="Idioma" value="Português" />
        </View>

        {/* Suporte */}
        <SectionLabel title="Suporte" />
        <View style={styles.menuGroup}>
          <MenuItem icon={<HelpIcon/>} label="Ajuda & FAQ" />
          <MenuItem icon={<ChatIcon/>} label="Fale Conosco" />
          <MenuItem icon={<LockIcon/>} label="Políticas de Privacidade" />
          <MenuItem icon={<FolhaICon/>} label="Termos de Uso" />
        </View>

        {/* Sair */}
        <View style={[styles.menuGroup, { marginTop: 8 }]}>
          <MenuItem icon={<LogoutIcon/>} label="Sair da Conta" showArrow={false} danger onPress={signOut} />
        </View>

        <Text style={styles.version}>xocolite v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: Colors.brown.dark,
   },

  fixedTop: {
    backgroundColor: Colors.brown.dark,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  pageTitle: {
    color: Colors.text.primary,
    fontSize: 22,
    fontWeight: "700",
  },

  scrollArea:{
     flex: 1 
    },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24
   },


  // Menu
  menuGroup: {
    backgroundColor: Colors.brown.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },

  version: {
    color: Colors.text.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 4,
  },

});
