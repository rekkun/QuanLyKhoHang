import { Image, StyleSheet, Platform, Button } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen = (props : any) => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ứng dụng quản lý {'\n'}kho hàng</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nhóm 9 - 20241IT6029004</ThemedText>
        <ThemedText type="subtitle">Chức năng chính</ThemedText>
        <ThemedText>
          Nhập thông tin: <ThemedText type="defaultSemiBold">kệ hàng, ngăn hàng, hộp chứa, linh kiện và vị trí linh kiện</ThemedText> vào CSDL.
        </ThemedText>
        <ThemedText>
          Tìm vị trí linh kiện trong kho <ThemedText type="defaultSemiBold">{'('}chỉ cần dùng từ khoá{')'}</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Công nghệ sử dụng</ThemedText>
        <Collapsible title="Client">
          <ThemedText>
            Công nghệ sử dụng để xây dựng Client:{'\n'}
            <ThemedText type="defaultSemiBold">- React-Native:</ThemedText>{'\n'}Framework mã nguồn mở để phát triển ứng dụng di động Android, iOS, Web.{'\n'}
            <ThemedText type="defaultSemiBold">- Bộ công cụ phát triển Android {'('}Android SDK{')'}:</ThemedText>{'\n'}Android SDK cung cấp API, thư viện, build tools và compile tools,...{'\n'}
            <ThemedText type="defaultSemiBold">- Android Studio và Visual Studio Code:</ThemedText>{'\n'}Là IDE và Text Editor để xây dựng Client{' '}
          </ThemedText>
        </Collapsible>
        <Collapsible title="Server">
          <ThemedText>
            Công nghệ sử dụng để xây dựng Server:{'\n'}
            <ThemedText type="defaultSemiBold">- NodeJS:</ThemedText>{'\n'}Runtime environment JavaScript đa nền tảng và nguồn mở.{'\n'}
            <ThemedText type="defaultSemiBold">- Expressjs:</ThemedText>{'\n'}Framework phổ biến được sử dụng để xây dựng WebApp và API thông qua NodeJS{'\n'}
            <ThemedText type="defaultSemiBold">- MySQL:</ThemedText>{'\n'}Hệ quản trị cơ sở dữ liệu (Relational Database Management System - RDBMS) mã nguồn mở.{'\n'}
            <ThemedText type="defaultSemiBold">- Prisma:</ThemedText>{'\n'}ORM mã nguồn mở, sử dụng để tương tác với MySQL dễ dàng hơn trong môi trường NodeJS{'\n'}
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

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
});

export default HomeScreen;