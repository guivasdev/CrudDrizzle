import { StyleProp, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { PaperProvider, Button, TextInput } from "react-native-paper"
import React, { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import { colors } from "@/theme/colors"

export interface ModelSearchUserProps {
  style?: StyleProp<ViewStyle>
}

export const ModelSearchUser = (props: ModelSearchUserProps) => {
  const { style } = props
  const { themed } = useAppTheme()

  const [selectedOrder, setSelectedOrder] = useState()
  const [selectedStatus, setSelectedStatus] = useState()

  return (
    <PaperProvider>
      <View style={[themed($container), style]}>

        {/* HEADER */}
        <View style={themed($header)}>
          <Text style={themed($title)}>Filtros</Text>
          <Button icon="close" onPress={() => { } } children={undefined} />
        </View>

        {/* CONTENT */}
        <View style={themed($content)}>

          {/* BUSCA */}
          <View style={themed($section)}>
            <Text style={themed($label)}>Buscar nome</Text>
            <TextInput
              placeholder="Digite um nome..."
              mode="outlined"
              style={themed($input)}
              left={<TextInput.Icon icon="magnify" />}
            />
          </View>

          {/* ORDENAR */}
          <View style={themed($section)}>
            <Text style={themed($label)}>Ordenar por</Text>
            <View style={themed($pickerContainer)}>
              <Picker
                selectedValue={selectedOrder}
                onValueChange={(itemValue) => setSelectedOrder(itemValue)}
              >
                <Picker.Item label="Nome A-Z" value="az" />
                <Picker.Item label="Nome Z-A" value="za" />
              </Picker>
            </View>
          </View>

          {/* STATUS */}
          <View style={themed($section)}>
            <Text style={themed($label)}>Status</Text>
            <View style={themed($pickerContainer)}>
              <Picker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
              >
                <Picker.Item label="Todos" value="all" />
                <Picker.Item label="Ativo" value="active" />
                <Picker.Item label="Inativo" value="inactive" />
              </Picker>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={themed($footer)}>
          <Button
            mode="contained"
            style={themed($buttonPrimary)}
            onPress={() => console.log("Aplicar")}
          >
            Aplicar filtros
          </Button>

          <Button
            mode="outlined"
            style={themed($buttonSecondary)}
            onPress={() => console.log("Limpar")}
          >
            Limpar filtros
          </Button>
        </View>
      </View>
    </PaperProvider>
  )
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
})

const $header: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E5E5",
})

const $title: ThemedStyle<any> = () => ({
  fontSize: 18,
  fontWeight: "600",
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  paddingLeft: 10,
  paddingRight:10
})

const $section: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 20,
})

const $label: ThemedStyle<any> = () => ({
  marginBottom: 6,
  fontSize: 14,
  fontWeight: "500",
})

const $input: ThemedStyle<ViewStyle> = () => ({
  height: 48,
})

const $pickerContainer: ThemedStyle<ViewStyle> = () => ({
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 12,
  overflow: "hidden",
})

const $footer: ThemedStyle<ViewStyle> = () => ({
  paddingLeft:10,
  paddingRight:10,
  paddingBottom:0,
  gap: 12,
})

const $buttonPrimary: ThemedStyle<ViewStyle> = () => ({
  borderRadius: 12,
  paddingVertical: 6,
  backgroundColor: colors.palette.secondary500,
})

const $buttonSecondary: ThemedStyle<ViewStyle> = () => ({
  borderRadius: 12,
})