import { ChocolateIcon } from '@/components/SubComponents(cart)';
import { PRODUCTS } from '@/Products';
import { useCartStore } from '@/store/cartStore';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width } = Dimensions.get('window');

type ProductCardProps = {
  item: (typeof PRODUCTS)[0];
  onPress?: () => void; // Opcional, como você definiu
};
export default function TesteScreen ({ item, onPress }: ProductCardProps){
  const addItem = useCartStore((state) => state.addItem);

  return (
    <TouchableOpacity
      style={styles.productCardBottomSheet}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* Header: Nome e Favorito */}
      <View style={styles.headerRowBottomSheet}>
        <Text style={styles.productNameBottomSheet}>{item.name.toUpperCase()}</Text>
        <TouchableOpacity style={styles.favoriteBtnBottomSheet}>
          <Text style={[styles.favoriteIconBottomSheet, { color: item.favorited ? "#ff4d4d" : "#fff" }]}>
            {item.favorited ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Thumbnail Container */}
      <View style={styles.productThumbBottomSheet}>
        <ChocolateIcon />

        {/* Tag flutuante sobre a imagem */}
        <View style={[
          styles.tagBadgeBottomSheet,
          item.tag === "NOVO" ? styles.tagNovoBottomSheet : styles.tagPremiumBottomSheet
        ]}>
          <Text style={styles.tagTextBottomSheet}>{item.tag}</Text>
        </View>
      </View>

      {/* Stars & Description Row */}
      <View style={styles.detailsSectionBottomSheet}>
        <View style={styles.starsRowBottomSheet}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={{ color: i < item.rating ? '#FFD700' : '#555' }}>★</Text>
          ))}
        </View>
        <Text style={styles.productDescBottomSheet} numberOfLines={3}>
          {item.description}
        </Text>
      </View>

      {/* Footer: Preço e Botão Adicionar */}
      <View style={styles.footerBottomSheet}>
        <Text style={styles.priceBottomSheet}>R$ {item.price}</Text>

        <TouchableOpacity
          style={styles.addBtnBottomSheet}
        >
          <Text style={styles.addBtnTextBottomSheet}>BOTÃO PARA ADICIONAR AO CARRINHO</Text>
          <Text>🛒</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCardBottomSheet: {
    backgroundColor: '#2D1406', // Marrom escuro da imagem
    borderRadius: 40, // Bem arredondado como na foto
    padding: 20,
    width: width * 0.85,
    alignSelf: 'center',
    marginVertical: 10,
  },
  headerRowBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  productNameBottomSheet: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteIconBottomSheet: {
    fontSize: 24,
  },
  productThumbBottomSheet: {
    backgroundColor: '#FFF',
    height: 180,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Para a tag flutuar
  },
  tagBadgeBottomSheet: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#00FF41', // Verde neon da tag
  },
  tagTextBottomSheet: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  detailsSectionBottomSheet: {
    marginTop: 20,
  },
  starsRowBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  productDescBottomSheet: {
    color: '#A08070', // Tom de bege/marrom claro
    fontSize: 12,
    textAlign: 'right',
    lineHeight: 16,
  },
  footerBottomSheet: {
    marginTop: 20,
    alignItems: 'center',
  },
  priceBottomSheet: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  addBtnBottomSheet: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addBtnTextBottomSheet: {
    color: '#2D1406',
    fontWeight: 'bold',
    fontSize: 10,
  },

      tagPremiumBottomSheet: {
        backgroundColor: "#5a2d00",
    },
    tagNovoBottomSheet: {
        backgroundColor: "#1a3d1a",
    },

     favoriteBtnBottomSheet: {
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1,
    },
});