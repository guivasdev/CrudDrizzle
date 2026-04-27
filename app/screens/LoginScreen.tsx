import React, { FC } from "react"
import { ViewStyle, TextStyle } from "react-native"
import { TextInput, Button, Card } from "react-native-paper"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useModelSearchUser } from "@/features/crud/hooks/useModelSearchUser"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { themed, theme } = useAppTheme()
  const { name, password, setName, setPassword, searchUserLoginLocal } = useModelSearchUser()

  const handleLogin = async () => {
    const searchUserResult = await searchUserLoginLocal()

    if (searchUserResult) navigation.navigate("Home");

    else alert("Usuário nao encontrado!")
  }

  return (
    <Screen style={themed($root)} contentContainerStyle={{ flex: 1 }} preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <Card style={themed($card)} >
        <Text preset="heading" text="Bem-vindo" style={themed($title)} />

        <TextInput
          label="Nome de usuario"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={themed($input)}
          activeOutlineColor={theme.colors.tint}
          autoCapitalize="none"
        />

        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={themed($input)}
          activeOutlineColor={theme.colors.tint}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={themed($button)}
          labelStyle={{ fontSize: 22, padding: 3, letterSpacing: 2 }}
          uppercase={true}
          buttonColor={theme.colors.tint}
        >
          ENTRAR
        </Button>
        <Button
          mode="contained"
          style={themed($button)}
          labelStyle={{ fontSize: 22, padding: 3, letterSpacing: 2 }}
          uppercase={true}
          buttonColor={theme.colors.tint}
        >
          insert
        </Button>
      </Card>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
  paddingBottom: theme.spacing.xl,
  justifyContent: "space-around",
})
const $card: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  padding: theme.spacing.lg,
  borderRadius: theme.spacing.md,
  elevation: 1,
  justifyContent: 'space-around'
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.lg,
  textAlign: "center",
  lineHeight: theme.spacing.xxxl,
  letterSpacing: 4,
  textTransform: "uppercase",
  fontWeight: "bold",
  color: theme.colors.text,
  fontSize: 38
})

const $input: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
})

const $button: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.sm,
  marginBottom: theme.spacing.lg,
  width: "100%",
  borderRadius: theme.spacing.md,
})