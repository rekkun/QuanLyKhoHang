import { TextInput, Button, StyleSheet, View, FlatList, Text, ScrollView, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

interface Component {
  moTa: string,
  soLuong: string,
  id:string,
  hop: {
    id_hop: string,
    tenHop: string,
    ngan: {
      id_ngan: string,
      tenNgan: string,
      ke: {
        id_ke: string,
        tenKe: string
      }
    }
  }
}

const SearchScreen = (props: any) => {
  const [searchString, setSearchString] = useState('');
  const [listComponent, setListComponent] = useState<Component[]>([]);

  const handler = {
    search: async () => {
      fetch(`https://api.haui.us.kg/search/componentMapped?searchString=${searchString}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
       .then((response) => response.json())
       .then((json) => {
          if(json.err == false) setListComponent(json.msg);
        });
    }
  }

  const renderItem = ({ item }: { item: Component }) => (
    <View style={styles.row}>
      <Text style={styles.text}>Kệ: {item.hop.ngan.ke.tenKe}</Text>
      <Text style={styles.text}>Ngăn: {item.hop.ngan.tenNgan}</Text>
      <Text style={styles.text}>Hộp: {item.hop.tenHop}</Text>
      <Text style={styles.text}>Mô Tả: {item.moTa}</Text>
      <Text style={styles.text}>Số Lượng: {item.soLuong}</Text>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tìm kiếm vị trí linh kiện 🔍</ThemedText>
      </ThemedView>
      <ThemedText>Nhập từ khoá cần tìm kiếm, ví dụ: {'\n'}
        <ThemedText type="defaultSemiBold">màn hình, bảng mạch, nguồn,...</ThemedText>
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Từ khoá tìm kiếm - Keyword"
        onChangeText={(value) => setSearchString(value)}
      />
      <Button
        title="Tìm kiếm"
        onPress={() => handler.search()}
      />
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
        <View style={styles.container}>
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <FlatList
              data={listComponent}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  }
});

export default SearchScreen;