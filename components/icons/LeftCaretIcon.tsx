import { FontAwesome } from "react-native-vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

type LeftCaretIconProps = {
  size?: number;
  color?: string;
};

function LeftCaretIcon(props: LeftCaretIconProps) {
  return (
    <FontAwesome
      name="caret-left"
      size={props.size || 30}
      // color={props.color || Colors.primary.darkRed}
    />
  );
}

export default LeftCaretIcon;
