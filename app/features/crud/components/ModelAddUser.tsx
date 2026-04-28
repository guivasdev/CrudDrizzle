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
  const { themed, theme } = useAppTheme()

  const { name, setName, password, setPassword, admin, setAdmin, addUser } = useModelAddUser()

  const handleInput = async () => {
    await addUser()
    asyncAlert("", "Usuário adicionado com sucesso!")
  }

  const asyncAlert = (title: string, message: string) => {
    return new Promise((resolve) => {
      Alert.alert(title, message, [
        { text: "OK", onPress: () => handleView(resolve) },
      ])
    })
  }

  const handleView = (resolve: any) => {
    handleViewFather(!modalVisible)
    resolve(true)
  }

  return (
    <PaperProvider>
      <View style={themed($container)}>
        <ScrollView contentContainerStyle={themed($content)}>

          {/* HEADER */}
          <Text
            text="Novo Usuário"
            style={themed($title)}
          />

          {/* FORM */}
          <View style={themed($section)}>
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
          </View>

          {/* CHECKBOX */}
          <View style={themed($section)}>
            <Checkbox
              value={admin}
              onValueChange={setAdmin}
              label="É Administrador?"
              containerStyle={themed($checkboxContainer)}
            />
          </View>

          {/* ACTION */}
          <View style={themed($footer)}>
            <Button
              mode="contained"
              style={themed($buttonPrimary)}
              onPress={handleInput}
            >
              Salvar
            </Button>
          </View>

        </ScrollView>
      </View>
    </PaperProvider>
  )
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  borderRadius: 16,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  padding: 20,
})

const $title: ThemedStyle<any> = () => ({
  fontSize: 22,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: 24,
})

const $section: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 20,
})

const $input: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 12,
  height: 48,
})

const $checkboxContainer: ThemedStyle<ViewStyle> = () => ({
  paddingLeft: 4,
})

const $footer: ThemedStyle<ViewStyle> = () => ({
  marginTop: 10,
})

const $buttonPrimary: ThemedStyle<ViewStyle> = (theme) => ({
  borderRadius: 12,
  paddingVertical: 6,
  backgroundColor: theme.colors.tint,
})