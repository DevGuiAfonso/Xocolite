import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { PRODUCTS } from "@/Products";
import { ImgPequena } from "@/components/Cards/ImgChocolate";
import { Colors } from "@/global/color";
import { useCartStore } from "@/store/cartStore";



const CATEGORIES = ["Todos", "Premium", "Novo", "Artesanal", "Clássico"];

export const CategoryTabs = ({
    selected,
    onSelect,
}: {
    selected: string;
    onSelect: (c: string) => void;
}) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
    >
        {CATEGORIES.map((cat) => (
            <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, selected === cat && styles.categoryPillActive]}
                onPress={() => onSelect(cat)}
            >
                <Text
                    style={[styles.categoryText, selected === cat && styles.categoryTextActive]}
                >
                    {cat}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

export const OfferBanner  = ({ item }: { item: (typeof PRODUCTS)[0] }) => (
    <TouchableOpacity style={styles.offerBanner} activeOpacity={0.85}>
        <View style={styles.offerLeft}>
            <Text style={styles.offerLabel}> OFERTA DO DIA</Text>
            <Text style={styles.offerTitle}>Chocolate Branco Suíço{"\n"}com 30% OFF</Text>
            <View style={styles.offerButton}>
                <Text style={styles.offerButtonText}>Ver oferta →</Text>
            </View>
        </View>

        <ImgPequena image={item.image} />
    </TouchableOpacity>
);


type ProductCardProps = {
    item: (typeof PRODUCTS)[0];
    onPress?: () => void;
};

export const ProductCard = ({ item, onPress }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <TouchableOpacity style={styles.productCard} activeOpacity={0.90} onPress={onPress}>

            {/* Favorite */}
            <TouchableOpacity style={styles.favoriteBtn}>
                <Text style={{ fontSize: 18, color: item.favorited ? "#fff" : "#5a3a1a" }}>
                    {item.favorited ? "♥" : "♡"}
                </Text>
            </TouchableOpacity>

            {/* Thumbnail */}
            <View style={styles.productThumb}>
                <ChocolateIcons image={item.image} />
            </View>

            {/* Tag */}
            <View style={[
                styles.tagBadge,
                item.tag === "NOVO" ? styles.tagNovo : styles.tagPremium
            ]}>
                <Text style={styles.tagText}>{item.tag}</Text>
            </View>

            {/* Info */}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>

            {/* Stars */}
            <View style={styles.starsRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < item.rating} />
                ))}
                <Text style={styles.reviewCount}> {item.reviews}</Text>
            </View>

            {/* Add */}
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                    const payload = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        tag: item.tag,
                        price: Number(item.price),
                        quantity: 1,
                        image: item.image,
                    };

                    console.log("ADD:", payload);

                    addItem(payload);
                }}
            >
                <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>

            <View style={styles.priceRow}>
                <Text style={styles.price}>R$: {item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

// ─── ICONS (inline SVG-style placeholders using Text) ─────────────────────────

type ChocolateIconProps = {
    image: any;
};

const ChocolateIcons = ({ image }: ChocolateIconProps) => (
    <View style={styles.chocolateIcon}>
        <ImgPequena image={image} />
    </View>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
    <Text style={{ color: filled ? "#E8A045" : "#5a3a1a", fontSize: 12 }}>★</Text>
);

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    // Offer banner
    offerBanner: {
        backgroundColor: Colors.brown.accent,
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    offerLeft: {
        flex: 1,
    },
    offerLabel: {
        color: Colors.common.white,
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
        marginBottom: 6,
    },
    offerTitle: {
        color: Colors.common.white,
        fontSize: 22,
        fontWeight: "800",
        lineHeight: 28,
        marginBottom: 14,
    },
    offerButton: {
        backgroundColor: "rgba(255,255,255,0.15)",
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    offerButtonText: {
        color: Colors.common.white,
        fontWeight: "600",
        fontSize: 13,
    },

    // Categories
    categoriesContainer: {
        paddingBottom: 4,
        gap: 8,
    },
    categoryPill: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.brown.mid,
        marginRight: 8,
    },
    categoryPillActive: {
        backgroundColor: Colors.orange.bright,
    },
    categoryText: {
        color: Colors.text.muted,
        fontSize: 14,
        fontWeight: "600",
    },
    categoryTextActive: {
        color: Colors.common.white,
    },


    // Chocolate icon (decorative)
    chocolateIcon: {
        width: '100%',
        height: 104,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chocTop: {
        width: 52,
        height: 36,
        backgroundColor: "#d4d3d3",
        borderRadius: 6,
        marginBottom: 2,
    },
    chocBottom: {
        width: 52,
        height: 24,
        backgroundColor: "#dfdfdf",
        borderRadius: 6,
    },

    // Products grid
    productCard: {
        backgroundColor: Colors.brown.card,
        borderRadius: 16,
        padding: 14,
        width: "47.5%",
        position: "relative",
    },
    favoriteBtn: {
        width: 30,
        height: 30,
        backgroundColor: Colors.brown.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1,
    },
    productThumb: {
        marginBottom: 10,
    },
    tagBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: 8,
    },
    tagPremium: {
        backgroundColor: "#5a2d00",
    },
    tagNovo: {
        backgroundColor: "#1a3d1a",
    },
    tagText: {
        color: Colors.text.primary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    productName: {
        color: Colors.text.primary,
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 3,
    },
    productDesc: {
        color: Colors.text.muted,
        fontSize: 12,
        marginBottom: 8,
    },
    starsRow: {

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    reviewCount: {
        color: Colors.text.muted,
        fontSize: 11,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        color: Colors.orange.bright,
        fontSize: 15,
        fontWeight: "700",
    },
    addBtn: {
        backgroundColor: Colors.orange.bright,
        left: 115,
        top: 20,
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    addBtnText: {
        color: Colors.common.white,
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 22,
    },
})