import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList, ScrollView } from "react-native"
import { TextInput, Button, Card, Portal, Modal, FAB, Provider } from "react-native-paper"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Checkbox } from "@/components/Toggle/Checkbox"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useDatabase } from "@/context/DatabaseContext"

interface User {
  id: string
  username: string
  password: string
  isAdmin: boolean
}

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed, theme } = useAppTheme()
  const { searchUser, createUser, userNameSearch, userPassSearch, setUserNameSearch, setUserPassSearch, adminUser, setAdminUser, success, error } = useDatabase();

  // Estados para o formulário
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const addUser = async () => {

    const getResult = await createUser();
    alert(getResult)

  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await searchUser();
        console.log("Usuários recuperados:", users);
        setUsers(users);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <Provider>
      <Screen style={themed($root)} preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <Text preset="heading" text="Gerenciar Usuários" style={themed($title)} />

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={themed($userItem)}>
              <Card.Content style={themed($userRow)}>
                <View style={{ flex: 1 }}>
                  <Text text={item.username} weight="bold" />
                  <Text text={`Senha: ${item.password}`} size="xs" style={{ opacity: 0.6 }} />
                </View>
                <View style={[themed($adminStatus), item.isAdmin && { backgroundColor: "#4CAF50" }]}>
                  <Text text={item.isAdmin ? "ADMIN" : "USER"} size="xxs" style={themed($adminText)} />
                </View>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={
            <Text text="Nenhum usuário na lista" style={themed($emptyText)} />
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            contentContainerStyle={themed($modalContainer)}
          >
            <ScrollView>
              <Text preset="subheading" text="Novo Usuário" style={{ marginBottom: theme.spacing.md }} />

              <TextInput
                label="Nome de usuário"
                value={userNameSearch}
                onChangeText={setUserNameSearch}
                mode="outlined"
                style={themed($input)}
                activeOutlineColor={theme.colors.tint}
              />
              <TextInput
                label="Senha"
                value={userPassSearch}
                onChangeText={setUserPassSearch}
                mode="outlined"
                secureTextEntry
                style={themed($input)}
                activeOutlineColor={theme.colors.tint}
              />
              <Checkbox
                value={adminUser}
                onValueChange={setAdminUser}
                label="É Administrador?"
                containerStyle={themed($checkboxContainer)}
              />
              <Button
                mode="contained"
                onPress={addUser}
                buttonColor={theme.colors.tint}
                style={themed($button)}
              >
                SALVAR
              </Button>
            </ScrollView>
          </Modal>

          <FAB
            icon="plus"
            style={themed($fab)}
            onPress={() => setIsModalVisible(true)}
            color="white"
          />
        </Portal>
      </Screen></Provider>
  )
}

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
})

const $title: ThemedStyle<TextStyle> = (theme) => ({
  marginVertical: theme.spacing.lg,
  textAlign: "center",
})

const $input: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.sm,
})

const $checkboxContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
})

const $button: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: 4,
})

const $userItem: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.sm,
})

const $userRow: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $adminStatus: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral300,
  paddingHorizontal: theme.spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $adminText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $emptyText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  opacity: 0.5,
  marginTop: 20,
})

const $fab: ThemedStyle<ViewStyle> = (theme) => ({
  position: "absolute",
  right: theme.spacing.lg,
  bottom: theme.spacing.lg,
  backgroundColor: theme.colors.tint,
})

const $modalContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.lg,
  margin: theme.spacing.lg,
  borderRadius: theme.spacing.md,
})