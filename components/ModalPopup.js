import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

const ModalPopup = ({ visible, onRequestClose, onConfirm, children }) => {
  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.black,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding * 2,
            borderRadius: SIZES.radius,
          }}
        >
          <View style={{ marginBottom: SIZES.padding }}>{children}</View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ marginLeft: SIZES.padding }}
              onPress={handleCancel}
            >
              <Text style={{ color: COLORS.white }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: SIZES.padding }}
              onPress={onConfirm}
            >
              <Text style={{ color: COLORS.white }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;
