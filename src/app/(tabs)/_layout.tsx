import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}