import Icon from "@components/global/Icon";

export const icons = {
  Home: (props: any) =>
    props.isFocused ? (
      <Icon name="homeFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="homeOutline"
        size={props.size}
        strokeWidth={0.4}
        color={props.color}
      />
    ),
  Chat: (props: any) =>
    props.isFocused ? (
      <Icon name="chatsFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="chatsOutline"
        size={props.size}
        strokeWidth={2}
        color={props.color}
      />
    ),
  Profile: (props: any) =>
    props.isFocused ? (
      <Icon name="userFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="userOutline"
        size={props.size}
        strokeWidth={2.5}
        color={props.color}
      />
    ),
};
