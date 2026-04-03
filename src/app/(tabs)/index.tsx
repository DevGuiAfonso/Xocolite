import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";

import { OfferBanner, ProductCard } from "@/components/Cards/CardsMain";
import { ImgGrande } from "@/components/Cards/ImgChocolate";
import { CartLarge } from "@/components/Icons";
import { Header, SearchBar } from "@/components/SubComponents(index)";
import { Colors } from "@/global/color";
import { PRODUCTS } from "@/Products";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "expo-router";











export default function Index() {
  const router = useRouter();

  //  pega função global do carrinho (Zustand)
  const addItem = useCartStore((state) => state.addItem);

  //  estado da categoria (filtro visual)
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  //  estado MAIS IMPORTANTE: item clicado ((Lembrar dele))
  const [selectedItem, setSelectedItem] = useState<any>(null);

  //  referência do modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //  alturas do modal
  const snapPoints = useMemo(() => ["72%", "90%"], []);

  // abre modal + salva item
  const handleOpenProduct = useCallback((item: any) => {
    setSelectedItem(item);
    bottomSheetModalRef.current?.present();
  }, []);

  //  backdrop (fundo escuro clicável)
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  // produtos (estou usando para trocar no offbaner)

  const item = PRODUCTS[1];

  //temTexto = search.length > 0 para esconder o Offbaner
  const [search, setSearch] = useState("")

  //buscar itens

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );






  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.brown.dark} />

      {/* TOPO (Catecoria e barra de pesquisa) */}
      <View style={styles.fixedTop}>
        <Header />
        <SearchBar value={search} onChange={setSearch} />

      </View>

      {/* SCROLL */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Header seção */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nossos Produtos</Text>
          <Text style={styles.sectionCount}>
            {PRODUCTS.length} itens
          </Text>
        </View>

        {!search.trim() && <OfferBanner item={item} />}


        {/* GRID ((Os ITEns ESTão AQUI BLZ?)) */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={() => handleOpenProduct(item)}
            />
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM SHEET */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#f1f1f100' }}
        backgroundStyle={{ backgroundColor: '#f1f1f100' }}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainerBottomSheetModal}>

          {selectedItem && (
            <>
              <View style={{ backgroundColor: '#ffffff00', height: '110%', width: '120%' }}>
                <SafeAreaView style={styles.containerBottomSheet}>
                  {/* 1. Espaço no topo */}
                  <View style={styles.topSpaceBottomSheet} />

                  {/* 2. O Bloco Central (Aqui mudamos para Row para ter duas colunas) */}
                  <View style={styles.middleSectionBottomSheet}>

                    {/* Coluna da Esquerda (Verde e Azul) */}
                    <View style={styles.leftColumnBottomSheet}>
                      <View style={styles.greenBoxBottomSheet}>
                        <Text style={styles.titleBottomSheetModal}>
                          {selectedItem.name.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.blueBoxBottomSheet}>
                        <TouchableOpacity
                          style={[styles.buttonBottomSheetModal, { marginTop: 30 }]}
                          onPress={() => {

                            if (!selectedItem) return;

                            const payload = {
                              id: selectedItem.id,
                              name: selectedItem.name,
                              description: selectedItem.fullDescription,
                              tag: selectedItem.tag,
                              price: Number(selectedItem.price),
                              quantity: 1,
                              image: item.image,
                            };
                            console.log("ADD:", payload);
                            addItem(payload);
                            router.push("/(tabs)/cartLarge")
                            bottomSheetModalRef.current?.dismiss()
                          }}
                        >


                          <Text style={{
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 18,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                          }}>ADICIONAR AO  {'>'}
                          </Text>
                          <CartLarge />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Coluna da Direita (Vermelho) */}
                    <View style={styles.redBoxBottomSheet}>
                      <ImgGrande image={selectedItem.image} />
                    </View>

                  </View>

                  {/* 3. Rodapé (Description) */}
                  <View style={styles.descriptionBoxBottomSheet}>

                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: Colors.common.black,
                      marginTop:60
                    }}>
                      Descrição do produto
                    </Text>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: Colors.common.black,
                      margin:10
                    }}>
                      V
                    </Text>
                    <Text style={styles.descriptionBottomSheetModal}>
                      {selectedItem.fullDescription.toUpperCase()}
                    </Text>
                  </View>
                </SafeAreaView>
              </View>
            </>
          )}

          {/* BOTÃO */}


        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.brown.dark,
  },

  //  Topo 
  fixedTop: {
    backgroundColor: Colors.brown.dark,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },

  // Scroll
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.brown.dark,
  },

  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 100,
  },

  //  TabBar 
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 20,
  },

  // Seção
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: "700",
  },

  sectionCount: {
    color: Colors.text.muted,
    fontSize: 13,
  },

  //  Grid
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  //BottomSheetModal

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.orange.bright,
  },

  buttonBottomSheetModal: {
    paddingVertical: 15,
    paddingHorizontal: 32,
    backgroundColor: Colors.common.black,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    left: 60,
    zIndex: 20
  },
  buttonTextBottomSheetModal: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainerBottomSheetModal: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  titleBottomSheetModal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.common.black,
    margin: 30,
    position:'absolute'
  },
  descriptionBottomSheetModal: {
    width: "80%",
    fontSize: 12,
    color: Colors.text.muted,
    textAlign: "justify",
    lineHeight: 15,
  },

  //teste

  chocolateIcon: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: Colors.back.assets,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  //teste 2
  containerBottomSheet: {
    flex: 1, // Faz a View ocupar a tela inteira
  },
  topSpaceBottomSheet: {
    flex: 1, // Ocupa o espaço vazio no topo
  },
  middleSectionBottomSheet: {
    flexDirection: 'row', // << ISSO aqui cria as duas colunas lado a lado
    height: 300, // Altura fixa para o bloco das cores
  },
  leftColumnBottomSheet: {
    flex: 1, // Ocupa 50% da largura da middleSection
  },
  greenBoxBottomSheet: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.back.assets,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBoxBottomSheet: {
    flex: 1, // Ocupa a outra metade da altura da leftColumn
    backgroundColor: Colors.back.assets,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  redBoxBottomSheet: {
    flex: 1, // Ocupa os outros 50% da largura da middleSection
    backgroundColor: Colors.back.assets,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionBoxBottomSheet: {
    height: 500, // Altura do rodapé cinza
    backgroundColor: Colors.back.assets,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});