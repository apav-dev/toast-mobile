import { StyleSheet, View, TouchableOpacity, Modal, Text } from "react-native";
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

const SortModal = ({
  options,
  onOptionSelected,
  selectedOption,
  visible,
}: SortModalProps) => {
  return (
    <>
      <Modal
        style={styles.modalContainer}
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => onOptionSelected()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Sort By</Text>
              <TouchableOpacity onPress={() => onOptionSelected()}>
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
      </Modal>
    </>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.neutral.s500,
    opacity: 0.1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 78,
  },
  modalView: {
    backgroundColor: "white",
    opacity: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
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
    paddingVertical: 8,
    borderBottomColor: Colors.neutral.s200,
    paddingLeft: 16,
  },
  modalOptionText: {
    ...Typography.fontSize.x30,
  },
});
