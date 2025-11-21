import Icon from "@components/global/Icon";

export const icons = {
  Home: (props: any) =>
    props.isFocused ? (
      <Icon
        name="homeFilled"
        size={props.size}
        gradientColor={props.gradientColor}
      />
    ) : (
      <Icon
        name="homeOutline"
        size={props.size}
        strokeWidth={0.4}
        color={props.color}
      />
    ),
};
