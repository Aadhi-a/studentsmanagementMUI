import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { FC, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Gradients } from "@unistyles/constants";
import Button from "@components/global/Button";
import { useStyles } from "react-native-unistyles";
import { loginStyle } from "@unistyles/loginStyle";
import Input from "@components/global/Input";
import StyledText from "@components/global/StylesText";
import Icon from "@components/global/Icon";
import DeviceInfoLib from "react-native-device-info";
import BreakerText from "@components/global/BreakerText";
import { users } from "@assets/data/mockdata";
import { resetAndNavigate } from "@utils/NavigationUtills";
import { setStorage } from "@utils/mmkvStrorage";

const LoginScreen: FC = () => {
  const { styles } = useStyles(loginStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  // Device info
  const appVersion = DeviceInfoLib.getVersion();
  const buildNumber = DeviceInfoLib.getBuildNumber();
  const handleLogin = async () => {
    // Example async action
    return new Promise<void>((resolve) => {
      const user = users.find(
        (u) => u.email.trim() === email.trim() && u.password === password
      );

      setTimeout(() => {
        if (user) {
          resetAndNavigate("UserBottomTabs");
          setStorage("User", JSON.stringify(user));
          setStorage("Request_Token", user.token);
        } else {
          Alert.alert("Login Failed", "Invalid email or password");
        }
        resolve();
      }, 2000);
    });
  };
  return (
    <LinearGradient
      colors={Gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.1, y: 0.4 }}
      style={styles.gradText}
    >
      <View style={styles.container}>
        <Image
          source={require("@assets/images/logo1.png")}
          style={{ width: 350, height: 100 }}
          resizeMode="contain"
        />
        <View style={styles.quoteContainer}>
          <StyledText
            variant="h1"
            fontFamily="HiMelodyRegular"
            style={styles.quoteTxt}
          >
            Time to shine!
          </StyledText>
          <StyledText
            variant="h2"
            fontFamily="HiMelodyRegular"
            style={styles.quoteTxt}
          >
            Log in and check your updates
          </StyledText>
        </View>
        <View>
          <Input
            label="Email"
            placeholder="Enter your email"
            leftIcon={
              <Icon name="mailFilled" size={20} color={Colors.primary} />
            }
            textColor={Colors.primaryDark}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            textColor={Colors.primaryDark}
            secureTextEntry={secure}
            rightIcon={
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Icon
                  name={secure ? "eyeFilled" : "eyelock"} // use your icons
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <Button
          title="Login"
          onPress={handleLogin}
          gradientColors={Gradients.secondary}
          loadingGradientColors={Gradients.secondary}
          loadingIndicatorColor={Colors.CloudDrift}
          textStyle={{ fontSize: 18 }}
        ></Button>

        <TouchableOpacity>
          <StyledText
            style={{ textAlign: "right" }}
            variant="h7"
            fontFamily="Roboto"
            color={Colors.accentDark}
          >
            Forget Password ?
          </StyledText>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
