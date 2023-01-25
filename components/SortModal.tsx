import { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Animated,
} from "react-native";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import CloseIcon from "./icons/CloseIcon";
import { SortOption } from "./Reviews";

type SortModalProps = {
  options: SortOption[];
  onOptionSelected: (option?: SortOption) => void;
  selectedOption: SortOption;
  visible?: boolean;
};

// TODO: add animation to centeredView
// TODO: close modal when clicking outside of modal
const SortModal = ({
  options,
  onOptionSelected,
  selectedOption,
  visible,
}: SortModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => onOptionSelected()}
      >
        <View style={styles.container}>
          <Animated.View style={[styles.background, { opacity: fadeAnim }]} />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Sort By</Text>
                <TouchableOpacity
                  style={{ zIndex: 3 }}
                  onPress={() => onOptionSelected()}
                >
                  <CloseIcon size={24} color={Colors.primary.orange} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.label}
                    onPress={() => {
                      onOptionSelected(option);
                      // setSortModalVisible(false);
                    }}
                  >
                    <View
                      style={{
                        ...styles.modalOption,
                        backgroundColor:
                          selectedOption.label === option.label
                            ? Colors.neutral.s100
                            : "transparent",
                        borderLeftWidth: 4,
                        borderLeftColor:
                          selectedOption.label === option.label
                            ? Colors.primary.orange
                            : "transparent",
                      }}
                    >
                      <Text style={styles.modalOptionText}>{option.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 78,
    bottom: 0,
    zIndex: 2,
  },
  background: {
    backgroundColor: Colors.neutral.s500,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    marginBottom: 78,
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 3,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
    width: "100%",
  },
  modalOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: Colors.neutral.s200,
    paddingLeft: 16,
  },
  modalOptionText: {
    ...Typography.fontSize.x30,
  },
});
