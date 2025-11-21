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
  Teachers: (props: any) =>
    props.isFocused ? (
      <Icon name="teacherFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="teacherOutline"
        size={props.size}
        strokeWidth={1.5}
        color={props.color}
      />
    ),
  Students: (props: any) =>
    props.isFocused ? (
      <Icon name="studentsFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="studentsOutline"
        size={props.size}
        strokeWidth={0.4}
        color={props.color}
      />
    ),
  Parents: (props: any) =>
    props.isFocused ? (
      <Icon name="studentsFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="studentsOutline"
        size={props.size}
        strokeWidth={0.4}
        color={props.color}
      />
    ),
  Exams: (props: any) =>
    props.isFocused ? (
      <Icon name="examsFilled" size={props.size} color={props.color} />
    ) : (
      <Icon
        name="examsOutline"
        size={props.size}
        strokeWidth={1.5}
        color={props.color}
      />
    ),
};
