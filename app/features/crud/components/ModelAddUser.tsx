import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { Button, Modal, PaperProvider, TextInput } from "react-native-paper"
import { useModelAddUser } from "../hooks/useModelAddUser"
import { Checkbox } from "@/components/Toggle/Checkbox"
import { Dispatch, SetStateAction } from "react"

export interface ModelAddUserProps {
  style?: StyleProp<ViewStyle>
  lidar: (novoEstado: boolean) => void
  modalVisible: boolean

}
export const ModelAddUser = ({ style, lidar, modalVisible }: ModelAddUserProps) => {
  const { themed, theme } = useAppTheme();

  const { name, setName, password, setPassword, admin, setAdmin, addUser } = useModelAddUser();

  const handleInput = async () => {
    await addUser();
    alert('Usuário adiconado com sucesso!');
    lidarhandle();
    return

  }
  const lidarhandle = () => {
    lidar(!modalVisible)
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
            onPress={addUser}
            buttonColor={theme.colors.tint}
            style={themed($button)}
            onPressIn={() => handleInput()}
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