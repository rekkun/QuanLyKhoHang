import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  Text
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react';

const ImportScreen = (props: any) => {
  const [shelfName, setShelfName] = useState('');
  const [shelfId, setShelfId] = useState('');
  const [shelfDescription, setShelfDescription] = useState('');

  const [listShelf, setListShelf] = useState<any[]>([]);
  const [listRack, setListRack] = useState<any[]>([])
  const [listCase, setListCase] = useState<any[]>([]);
  const [listComponent, setListComponent] = useState<any[]>([]);

  const [shelfPicked1, setShelfPicked1] = useState('');
  const [rackDescription, setRackDescription] = useState('');
  const [rackName, setRackName] = useState('');

  const [shelfPicked2, setShelfPicked2] = useState('');
  const [rackPicked2, setRackPicked2] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [caseName, setCaseName] = useState('');

  const [componentName, setComponentName] = useState('');
  const [componentQuantity, setComponentQuantity] = useState(0);

  const [shelfPicked3, setShelfPicked3] = useState('');
  const [rackPicked3, setRackPicked3] = useState('');
  const [casePicked3, setCasePicked3] = useState('');
  const [componentPicked3, setComponentPicked3] = useState('');
  const [componentMappedQuantity, setComponentMappedQuantity] = useState(0);
  const [componentMappedDescription, setComponentMappedDescription] = useState('');
  
  const handler = {
    importShelf: async () => {
      fetch('https://api.haui.us.kg/import/shelf', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: shelfName,
          shelfID: shelfId,
          description: shelfDescription || `Kệ ${shelfId}`,
        }),
      })
       .then((response) => response.json())
       .then((json) => {
          alert(json.msg);
        });
    },
    getShelfList: async () => {
      fetch('https://api.haui.us.kg/search/shelf', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
       .then((response) => response.json())
       .then((json) => {
          if(json.err == false) setListShelf(json.msg);
        });
    },
    importRack: async () => {
      fetch('https://api.haui.us.kg/import/rack', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfID: shelfPicked1,
          description: rackDescription || 'Ngăn hàng',
          name: rackName || 'Ngăn hàng',
        }),
      })
       .then((response) => response.json())
       .then((json) => {
          alert(json.msg);
        });
    },
    getRackList: async (shelfID : string) => {
      fetch(`https://api.haui.us.kg/search/rack?shelfID=${shelfID}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
       .then((response) => response.json())
       .then((json) => {
         if(json.err == false) setListRack(json.msg);
        });
    },
    importCase: async () => {
      fetch('https://api.haui.us.kg/import/case', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rackID: rackPicked2,
          shelfID: shelfPicked2,
          description: caseDescription || 'Hộp chứa linh kiện',
          name: caseName || 'Hộp chứa linh kiện',
        }),
      })
       .then((response) => response.json())
       .then((json) => {
          alert(json.msg);
        });
    },
    getCaseList: async (shelfID: string, rackID: string) => {
      fetch(`https://api.haui.us.kg/search/case?shelfID=${shelfID}&rackID=${rackID}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
       .then((response) => response.json())
       .then((json) => {
          if(json.err == false) setListCase(json.msg);
        });
    },
    importComponent: async () => {
      if (!componentName || !componentQuantity || componentQuantity < 1) return alert("Thông tin nhập không hợp lệ");
      fetch('https://api.haui.us.kg/import/component', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: componentName,
          quantity: componentQuantity || 0,
        }),
      })
       .then((response) => response.json())
       .then((json) => {
          alert(json.msg);
        });
    },
    getComponent: async () => {
      fetch('https://api.haui.us.kg/search/component', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
       .then((response) => response.json())
       .then((json) => {
          if(json.err == false) setListComponent(json.msg);
        });
    },
    importComponentMapped: async () => {
      if (!shelfPicked3 ||!rackPicked3 ||!casePicked3 ||!componentPicked3 || componentMappedQuantity < 1) return alert("Thông tin nhập không hợp lệ");
      fetch('https://api.haui.us.kg/import/componentMapped', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfID: shelfPicked3,
          rackID: rackPicked3,
          caseID: casePicked3,
          componentID: componentPicked3,
          description: componentMappedDescription,
          quantity: componentMappedQuantity || 0,
        }),
      })
       .then((response) => response.json())
       .then((json) => {
          alert(json.msg);
        });
    }
  };  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nhập thông tin 📝</ThemedText>
      </ThemedView>
      <Collapsible title="Nhập thông tin kệ hàng mới">
        <TextInput
          style={styles.input}
          placeholder="Tên kệ hàng - Name"
          onChangeText={(value) => setShelfName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="ID kệ hàng - ID"
          onChangeText={(value) => setShelfId(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả kệ hàng - Description"
          onChangeText={(value) => setShelfDescription(value)}
        />
        <Button
          title="Nhập mới"
          onPress={() => handler.importShelf()}
        />
      </Collapsible>
      <Collapsible title="Nhập thông tin ngăn chứa hàng mới">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listShelf}
          maxHeight={300}
          labelField="tenKe"
          valueField="id_ke"
          placeholder="Chọn kệ"
          value={shelfPicked1}
          onChange={(item) => {
            setShelfPicked1(item.id_ke);
          }}
          onFocus={() => handler.getShelfList() }
        />
        <TextInput
          style={styles.input}
          placeholder="Tên ngăn chứa - Name"
          onChangeText={(value) => setRackName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả ngăn chứa - Description"
          onChangeText={(value) => setRackDescription(value)}
        />
        <Button
          title="Nhập mới"
          onPress={() => handler.importRack()}
        />
      </Collapsible>
      <Collapsible title="Nhập thông tin hộp chứa linh kiện mới">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listShelf}
          maxHeight={300}
          labelField="tenKe"
          valueField="id_ke"
          placeholder="Chọn kệ"
          value={shelfPicked2}
          onChange={(item) => {
            setShelfPicked2(item.id_ke);
          }}
          onFocus={() => handler.getShelfList()}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listRack}
          maxHeight={300}
          labelField="tenNgan"
          valueField="id_ngan"
          placeholder="Chọn ngăn"
          value={rackPicked2}
          onChange={(item) => {
            setRackPicked2(item.id_ngan);
          }}
          onFocus={() => handler.getRackList(shelfPicked2)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên hộp chứa - Name"
          onChangeText={(value) => setCaseName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả hộp chứa - Description"
          onChangeText={(value) => setCaseDescription(value)}
        />
        <Button
          title="Nhập mới"
          onPress={() => handler.importCase()}
        />
      </Collapsible>
      <Collapsible title="Nhập thông tin linh kiện mới">
        <TextInput
          style={styles.input}
          placeholder="Tên linh kiện - Name"
          onChangeText={(value) => setComponentName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Số lượng trong kho - Quantity"
          inputMode='numeric'
          onChangeText={(value) => setComponentQuantity(Number.parseInt(value))}
        />
        <Button
          title="Nhập mới"
          onPress={() => handler.importComponent()}
        />
      </Collapsible>
      <Collapsible title="Nhập vị trí linh kiện">
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listShelf}
          maxHeight={300}
          labelField="tenKe"
          valueField="id_ke"
          placeholder="Chọn kệ"
          value={shelfPicked3}
          onChange={(item) => {
            setShelfPicked3(item.id_ke);
          }}
          onFocus={() => handler.getShelfList()}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listRack}
          maxHeight={300}
          labelField="tenNgan"
          valueField="id_ngan"
          placeholder="Chọn ngăn"
          value={rackPicked3}
          onChange={(item) => {
            setRackPicked3(item.id_ngan);
          }}
          onFocus={() => handler.getRackList(shelfPicked3)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listCase}
          maxHeight={300}
          labelField="tenHop"
          valueField="id_hop"
          placeholder="Chọn hộp"
          value={casePicked3}
          onChange={(item) => {
            setCasePicked3(item.id_hop);
          }}
          onFocus={() => handler.getCaseList(shelfPicked3, rackPicked3)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listComponent}
          maxHeight={300}
          labelField="tenLinhKien"
          valueField="id_linhkien"
          placeholder="Chọn linh kiện"
          value={componentPicked3}
          onChange={(item) => {
            setComponentPicked3(item.id_linhkien);
            setComponentMappedDescription(`${item.id_linhkien} | ${item.tenLinhKien}`);
          }}
          onFocus={() => handler.getComponent()}
        />
        <TextInput
          style={styles.input}
          placeholder="Số lượng trong hộp - Quantity"
          inputMode='numeric'
          onChangeText={(value) => setComponentMappedQuantity(Number.parseInt(value))}
        />
        <Button
          title="Nhập mới"
          onPress={() => handler.importComponentMapped()}
        />
      </Collapsible>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default ImportScreen;