import React, { ReactNode } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/global/color";
import { Bell, Pencil } from "./Icons";

// ─── TYPES

type MenuItemProps = {
  icon: ReactNode;
  label: string;
  value?: string;
  showArrow?: boolean;
  onPress?: () => void;
  danger?: boolean;
};

// ─── MOCK DATA ───── Vou fazer assim até fazer o Auth certo ───────────────────

export const USER = {
  name: "Guilherme Afonso",
  email: "guilheAfonso@email.com",
  avatar: null,
  favorites: 12,
  orders: 8,
  points: 340,
};



export const AvatarBlock = () => (
  <View style={styles.avatarSection}>
    <View style={styles.avatarWrapper}>
      {USER.avatar ? (
        <Image source={{ uri: USER.avatar }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarInitials}>
            {USER.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.editAvatarBtn}>
        <Pencil/>
      </TouchableOpacity>
    </View>
    <Text style={styles.userName}>{USER.name}</Text>
    <Text style={styles.userEmail}>{USER.email}</Text>
  </View>
);

export const StatsRow = () => (
  <View style={styles.statsRow}>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{USER.favorites}</Text>
      <Text style={styles.statLabel}>Favoritos</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{USER.orders}</Text>
      <Text style={styles.statLabel}>Pedidos</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{USER.points}</Text>
      <Text style={styles.statLabel}>Pontos</Text>
    </View>
  </View>
);

export const SectionLabel = ({ title }: { title: string }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

export const MenuItem = ({
  icon,
  label,
  value,
  showArrow = true,
  onPress,
  danger = false,
}: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIconBox, danger && styles.menuIconBoxDanger]}>
      {icon}
    </View>
    <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
    <View style={styles.menuRight}>
      {value ? <Text style={styles.menuValue}>{value}</Text> : null}
      {showArrow && <Text style={styles.menuArrow}>›</Text>}
    </View>
  </TouchableOpacity>
);

export const NotificationToggle = () => {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuIconBox}>
          <Bell/>
      </View>
      <Text style={styles.menuLabel}>Notificações</Text>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
        trackColor={{ false: "#3d1f00", true: "#26e020" }}
        thumbColor="#fff"
        style={{ marginLeft: "auto" }}
      />
    </View>
  );
};

  const styles = StyleSheet.create({

  // Avatar
  avatarSection: { alignItems: "center", paddingVertical: 24 },
  avatarWrapper: { position: "relative", marginBottom: 12 },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.brown.card,
    borderWidth: 3,
    borderColor: Colors.orange.bright,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: Colors.text.primary, fontSize: 28, fontWeight: "800" },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.orange.bright,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  editAvatarIcon: { fontSize: 13 },
  userName: { color: Colors.text.primary, fontSize: 20, fontWeight: "700", marginBottom: 4 },
  userEmail: { color: Colors.text.muted, fontSize: 13 },

  // Stats
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.brown.card,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { color: Colors.text.primary, fontSize: 18, fontWeight: "800", marginBottom: 4 },
  statLabel: { color: Colors.text.muted, fontSize: 12 },
  statDivider: { width: 1, backgroundColor: Colors.brown.mid },

  // Section

  sectionLabel: {
    color: Colors.text.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 4,
  },

  // Menu
  menuGroup: {
    backgroundColor: Colors.brown.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brown.mid,
  },
  menuIconBox: {
    width: 34,
    height: 34,
    backgroundColor: Colors.brown.mid,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuIconBoxDanger: { backgroundColor: "#3d0a0a" },
  menuIcon: { fontSize: 16 },
  menuLabel: { color: Colors.text.primary, fontSize: 15, flex: 1 },
  menuLabelDanger: { color: "#e05050" },
  menuRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  menuValue: { color: Colors.text.muted, fontSize: 13 },
  menuArrow: { color: Colors.text.muted, fontSize: 20, lineHeight: 22 },


});