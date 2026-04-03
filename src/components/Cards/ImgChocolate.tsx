import { Image, View } from "react-native";


type XocoMiniProps = {
  image: any;
};

export const ImgGrande = ({ image }: XocoMiniProps) => (
<View style={{
    width: 160,
    height: 410,
    position:'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    bottom:0,
  }}>
    <Image
      source={image}
      style={{ width: 160, height: 410 }}
    />
  </View>
);


export const ImgMedia = ({ image }: XocoMiniProps) => (
<View style={{
    width: 59,
    height: 150,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }}>
    <Image
      source={image}
      style={{ width: 59, height: 150 }}
    />
  </View>
);



export const ImgPequena = ({ image }: XocoMiniProps) => (
  <View style={{
    width: 120,
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderEndEndRadius:20,
    borderStartEndRadius:20,
    backgroundColor:'#fff'
  }}>
    <Image
      source={image}
      style={{ width: 67, height: 100 }}
    />
  </View>
);

