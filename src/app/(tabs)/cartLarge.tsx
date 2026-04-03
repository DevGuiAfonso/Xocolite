import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Colors
} from "@/global/color";

import {
  CartCard,
  DeliveryProgress,
  EmptyCart,
  OrderSummary,
} from "@/components/SubComponents(cart)";

import { useCartStore } from "@/store/cartStore";

const DELIVERY_FEE = 5.9;
const FREE_DELIVERY_THRESHOLD = 80;

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0a00" />

      {/* Header */}
      <View style={styles.fixedTop}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Carrinho</Text>

          {cart.length > 0 && (
            <TouchableOpacity onPress={clear}>
              <Text style={styles.clearAll}>Limpar tudo</Text>
            </TouchableOpacity>
          )}
        </View>

        {cart.length > 0 && (
          <DeliveryProgress subtotal={subtotal} />
        )}
      </View>

      {/* Conteúdo */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {cart.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
                onRemove={() => remove(item.id)}
              />
            ))}


          </>
        )}
      </ScrollView>

      {/* Botão final */}
      {cart.length > 0 && (
        <View style={styles.checkoutWrapper}>
          <OrderSummary
            subtotal={subtotal}
            delivery={delivery}
          />
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutBtnText}>
              Finalizar Pedido ·{" "}
              {formatPrice(subtotal + delivery)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.brown.dark },

  // Fixed top
  fixedTop: {
    backgroundColor: Colors.brown.dark,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  pageTitle: { color: Colors.text.primary, fontSize: 22, fontWeight: "700" },
  clearAll: { color: "#e05050", fontSize: 13 },

  // Scroll
  scrollArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60 },


  // Checkout
  checkoutWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: Colors.brown.dark,
    borderTopWidth: 1,
    borderTopColor: Colors.brown.mid,
    bottom: 50,
    gap:30,
  },
  checkoutBtn: {
    backgroundColor: Colors.orange.bright,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },

});