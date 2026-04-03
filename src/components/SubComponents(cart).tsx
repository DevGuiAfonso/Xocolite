import {
    Colors
} from "@/global/color";

import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ImgPequena } from "./Cards/ImgChocolate";
import { CartLargeEmpty } from "./Icons";






export type CartItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    tag: string;
    quantity: number;
    image: any;
};


// ─── MOCK DATA ────────────────────────────────────────────────────────────────



const DELIVERY_FEE = 5.9;
const FREE_DELIVERY_THRESHOLD = 80;
const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const ChocolateIcon = () => (
    <View style={styles.chocolateIcon}>
        <View style={styles.chocTop} />
        <View style={styles.chocBottom} />
    </View>
);

/** Reutiliza o visual do ProductCard adaptado para carrinho (horizontal) */
export const CartCard = ({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    item: CartItem;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}) => (
    <View style={styles.cartCard}>
        {/* Thumbnail */}
      
            <ImgPequena image={item.image} />
        

        {/* Info */}
        <View style={styles.cardInfo}>
            <View style={styles.cardTopRow}>
                <View style={[styles.tagBadge, item.tag === "NOVO" ? styles.tagNovo : styles.tagPremium]}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                </View>
                <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.removeBtn}>✕</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.cardBottomRow}>
                <Text style={styles.cardPrice}>{formatPrice(item.price * item.quantity)}</Text>

                {/* Quantity control */}
                <View style={styles.qtyControl}>
                    <TouchableOpacity
                        style={[styles.qtyBtn, item.quantity <= 1 && styles.qtyBtnDisabled]}
                        onPress={onDecrease}
                        disabled={item.quantity <= 1}
                    >
                        <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
                        <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
);

export const EmptyCart = () => (
    <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}><CartLargeEmpty /></Text>
        <Text style={styles.emptyTitle}>Carrinho vazio</Text>
        <Text style={styles.emptyDesc}>Adicione chocolates para continuar</Text>
    </View>
);

export const DeliveryProgress = ({ subtotal }: { subtotal: number }) => {
    const progress = Math.min(subtotal / FREE_DELIVERY_THRESHOLD, 1);
    const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

    return (
        <View style={styles.deliveryProgress}>
            <Text style={styles.deliveryText}>
                {remaining > 0
                    ? `Faltam ${formatPrice(remaining)} para frete grátis`
                    : "Você ganhou frete grátis!"}
            </Text>
            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
        </View>
    );
};

export const OrderSummary = ({
    subtotal,
    delivery,
}: {
    subtotal: number;
    delivery: number;
}) => (
    <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumo do Pedido</Text>

        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entrega</Text>
            <Text style={delivery === 0 ? styles.summaryFree : styles.summaryValue}>
                {delivery === 0 ? "Grátis" : formatPrice(delivery)}
            </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotalValue}>{formatPrice(subtotal + delivery)}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({

    clearAll: { color: "#e05050", fontSize: 13 },

    // Delivery progress
    deliveryProgress: {
        backgroundColor: Colors.brown.card,
        borderRadius: 12,
        padding: 12,
    },
    deliveryText: { color: Colors.text.muted, fontSize: 12, marginBottom: 8 },
    progressTrack: {
        height: 6,
        backgroundColor: Colors.brown.mid,
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: Colors.orange.bright,
        borderRadius: 3,
    },

    // Cart card (horizontal)
    cartCard: {
        backgroundColor: Colors.brown.card,
        borderRadius: 16,
        padding: 14,
        flexDirection: "row",
        marginBottom: 12,
        gap: 14,
    },

    cardInfo: {
        flex: 1
    },

    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    cardName: {
        color: Colors.text.primary,
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 2
    },

    cardDesc: {
        color: Colors.text.muted,
        fontSize: 12,
        marginBottom: 10
    },

    cardBottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardPrice: {
        color: Colors.orange.bright,
        fontSize: 16,
        fontWeight: "700"
    },

    removeBtn: {
        color: Colors.text.muted,
        fontSize: 14,
        fontWeight: "700"
    },


    // Tag badge (same as HomeScreen)
    tagBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tagPremium: { backgroundColor: "#5a2d00" },
    tagNovo: { backgroundColor: "#1a3d1a" },


    tagText: {
        color: Colors.text.primary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5
    },

    // Quantity control
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.brown.mid,
        borderRadius: 10,
        overflow: "hidden",
    },
    qtyBtn: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.brown.mid,
    },

    qtyBtnDisabled: { opacity: 0.3 },

    qtyBtnText: {
        color: Colors.text.primary,
        fontSize: 18,
        fontWeight: "700"
    },

    qtyValue: {
        color: Colors.text.primary,
        fontSize: 14,
        fontWeight: "700",
        paddingHorizontal: 10,
    },

    // Empty state
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
    },

    emptyIcon: {
        fontSize: 56,
        marginBottom: 16,
    },

    emptyTitle: {
        color: Colors.text.primary,
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8
    },

    emptyDesc: {
        color: Colors.text.muted,
        fontSize: 14
    },


    // Order summary
    summary: {
        backgroundColor: Colors.brown.card,
        borderRadius: 16,
        padding: 16,
        marginTop: 8,
    },
    summaryTitle: {
        color: Colors.text.primary,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 14,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    summaryLabel: { color: Colors.text.muted, fontSize: 14 },
    summaryValue: { color: Colors.text.primary, fontSize: 14 },
    summaryFree: { color: "#4caf50", fontSize: 14, fontWeight: "700" },
    summaryDivider: {
        height: 1,
        backgroundColor: Colors.brown.mid,
        marginVertical: 10,
    },
    summaryTotal: { color: Colors.text.primary, fontSize: 16, fontWeight: "700" },
    summaryTotalValue: { color: Colors.orange.bright, fontSize: 18, fontWeight: "800" },

    // Chocolate icon decorativo
    chocolateIcon: { width: 36, height: 44 },
    chocTop: { width: 36, height: 26, backgroundColor: "#5a2d00", borderRadius: 4, marginBottom: 2 },
    chocBottom: { width: 36, height: 16, backgroundColor: "#c0392b", borderRadius: 4 },
})