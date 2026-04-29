import React, { FC, useEffect, useState } from "react"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { View, FlatList, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { Card, Divider, FAB, Menu, Modal, Portal, Provider } from "react-native-paper"
import { Text } from "@/components/Text"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { User } from "@/context/DatabaseContext"
import { useModelAddUser } from "@/features/crud/hooks/useModelAddUser"
import { ModelAddUser } from "@/features/crud/components/ModelAddUser"
import { useModelSearchUser } from "@/features/crud/hooks/useModelSearchUser"
import { ModelSearchUser } from "@/features/crud/components/ModelSearchUser"
import { colors } from "@/theme/colors"
import { useDeleteUser } from "@/features/crud/hooks/useDeleteUser"
import { Button } from "@/components/Button"

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed } = useAppTheme()

  const [usersG, setUsers] = useState<User[]>([])

  const [visible, setVisible] = React.useState(false);
  const closeMenu = () => setVisible(false);

  const { modalVisibleAdd, setModalVisibleAdd } = useModelAddUser();
  const { modalVisibleSearch, setModalVisibleSearch } = useModelSearchUser();
  const { searchAllUsers } = useModelSearchUser();

  const {  deleteUser } = useDeleteUser();

  const [reload, setReload] = useState(false)

  const handleView = (novoEstado: boolean) => {
    setModalVisibleAdd(novoEstado)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await searchAllUsers()

        const formattedUsers = response.map((user) => ({
          id: user.id,
          name: user.name,
          password: user.password,
          adminUser: user.adminUser,
        }))

        setUsers(formattedUsers)
      } catch (error) {
        console.error("Erro ao buscar usuários:", error)
      }
    }

    fetchUsers()
  }, [reload])

  // fecha o menu e o apaga o model de addUser
  const handleModelAddUser = () => {
    setModalVisibleAdd(true)
    closeMenu()
  }

  const handleModelSearchUser = () => {
    setModalVisibleSearch(true)
    closeMenu()

  }
  const handleSelect = async (user: User) => {
    
    const response = await deleteUser(user.id);
    console.log("vamos ver... ", response)
    setReload(prev => !prev)

  }

  return (
    <Provider>
      <Screen contentContainerStyle={{ flex: 1 }} style={{ flex: 1, padding: 20, }}>
        <View style={{ flex: 9, zIndex: 2 }} >
          <Text preset="heading" text="Gerenciar Usuários" style={themed($title)}></Text>

          <FlatList
            data={usersG}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => handleSelect(item)}>
                <Card style={themed($userItem)}>
                  <Card.Content style={themed($userRow)}>

                    <View style={{ flex: 1 }}>
                      <Text text={item.name} weight="bold" />
                      <Text
                        text={`Senha: ${item.password}`}
                        size="xs"
                        style={{ opacity: 0.6 }}
                      />
                    </View>

                    <View
                      style={[
                        themed($adminStatus),
                        item.adminUser && { backgroundColor: "#4CAF50" },
                      ]}
                    >
                      <Text
                        text={item.adminUser ? "ADMIN" : "USER"}
                        size="xxs"
                        style={themed($adminText)}
                      />
                    </View>

                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text text="Nenhum usuário na lista" style={themed($emptyText)} />
            }
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        <View style={{ flex: 1, alignSelf: 'flex-end' }} >
          <Menu
            style={{ paddingBottom: 150, paddingRight: 10 }}
            elevation={2}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <FAB style={{ alignSelf: 'flex-end' }} icon="plus" onPress={() => setVisible(true)} color="white" />
            }>
            <Menu.Item onPress={() => handleModelAddUser()} title="Adicionar Usuário" />
            <Divider style={{ padding: 1 }} />
            <Menu.Item onPress={() => handleModelSearchUser()} title="Buscar Usuário" />
          </Menu>
        </View>

        <Portal>
          <Modal
            visible={modalVisibleAdd}
            onDismiss={() => setModalVisibleAdd(false)}

            contentContainerStyle={{
              marginTop: "auto",
              width: "100%",
              height: "80%",
              backgroundColor: colors.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 10,
            }}
          >
            <ModelAddUser handleViewFather={handleView} modalVisible={modalVisibleAdd} />
          </Modal>

          <Modal
            visible={modalVisibleSearch}
            onDismiss={() => setModalVisibleSearch(false)}
            contentContainerStyle={{
              marginTop: "auto",
              width: "100%",
              height: "80%",
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 10,
            }}
          >
            <ModelSearchUser />
          </Modal>

        </Portal>
      </Screen>
    </Provider >
  )
}

const $title: ThemedStyle<TextStyle> = (theme) => ({
  marginVertical: theme.spacing.lg,
  textAlign: "center",
})

const $userItem: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.sm,

})

const $userRow: ThemedStyle<ViewStyle> = () => ({
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

const $emptyText: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
  opacity: 0.5,
  marginTop: 20,
})