import { ScrollView, StyleProp, View, ViewStyle, Alert } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { Button, PaperProvider, TextInput } from "react-native-paper"
import { useModelAddUser } from "../hooks/useModelAddUser"
import { Checkbox } from "@/components/Toggle/Checkbox"

export interface ModelAddUserProps {
  style?: StyleProp<ViewStyle>
  handleViewFather: (novoEstado: boolean) => void
  modalVisible: boolean
}

export const ModelAddUser = ({ handleViewFather, modalVisible }: ModelAddUserProps) => {
  const { themed, theme } = useAppTheme();

  const { name, setName, password, setPassword, admin, setAdmin, addUser } = useModelAddUser();

  const handleInput = async () => {
    await addUser();
    asyncAlert("", "Usuário adicionado com sucesso!");
    return
  }

  const asyncAlert = (title: string, message: string) => {
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => handleView(resolve) },],
        { cancelable: false } // Required to force a button press

      );
    });
  };

  const handleView = (resolve: any) => {
    handleViewFather(!modalVisible)
    resolve(true)
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, borderRadius: 15, padding: 8, zIndex: 30, backgroundColor: theme.colors.palette.neutral500 }} >
        <ScrollView>
          <Text preset="subheading" text="Novo Usuário" style={{ fontWeight: "bold", marginBottom: theme.spacing.md, textAlign: 'center', fontSize: 32, lineHeight: 32 }} />

          <TextInput
            label="Nome de usuário"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={themed($input)}
            activeOutlineColor={theme.colors.tint}
          />
          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={themed($input)}
            activeOutlineColor={theme.colors.tint}
          />
          <Checkbox
            value={admin}
            onValueChange={setAdmin}
            label="É Administrador?"
            containerStyle={themed($checkboxContainer)}
          />
          <Button
            mode="contained"
            buttonColor={theme.colors.tint}
            style={themed($button)}
            onPress={() => handleInput()}
          >
            SALVAR
          </Button>
        </ScrollView>
      </View>
    </PaperProvider>
  )
}

const $input: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.sm,
})

const $checkboxContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
  paddingLeft: 3
})

const $button: ThemedStyle<ViewStyle> = () => ({
  marginTop: 4,
})