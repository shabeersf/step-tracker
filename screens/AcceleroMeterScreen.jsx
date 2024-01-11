import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accelerometer, Magnetometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Modal, Portal, PaperProvider } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";

const STRIDE_LENGTH = 0.762; // Average stride length in meters

export default function AcceleroMeterScreen() {
  const [steps, setSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [magnetometerData, setMagnetometerData] = useState({});

  
  const [fontsLoaded] = useFonts({
    Ample: require("../assets/fonts/Ample.ttf"),
  });

  const navigation = useNavigation();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    let accelSubscription;
    let magnetometerSubscription;

    const startAccelerometer = async () => {
      accelSubscription = Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        const threshold = 1.2;

        if (acceleration > threshold) {
          setSteps((prevSteps) => {
            const newSteps = prevSteps + 1;

            if (newSteps >= maxSteps) {
              stopSensors(); // Stop the sensors when maxSteps is reached
              setTimeout(() => {
                showModal();
              }, 1000);
            }

            return newSteps;
          });
        }
      });
    };

    const startMagnetometer = async () => {
      magnetometerSubscription = Magnetometer.addListener(
        (magnetometerData) => {
          setMagnetometerData(magnetometerData);
        }
      );
    };

    const stopSensors = () => {
      if (accelSubscription) {
        accelSubscription.remove();
      }
      if (magnetometerSubscription) {
        magnetometerSubscription.remove();
      }
    };

    startAccelerometer();
    startMagnetometer();

    return () => {
      stopSensors();
    };
  }, []);

  const maxSteps = 50;

  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      const calculatedProgress = (steps / maxSteps) * 100;
      setProgress(calculatedProgress);
    }, [isFocused, steps])
  );

  const distanceInKm = (steps * STRIDE_LENGTH) / 1000;

  const renderCircles = () => {
    const totalCircles = 24;
    const circles = [];
    const circleRadius = 60;
    const gapFactor = 1.4;

    for (let i = 0; i < totalCircles; i++) {
      const angle = (i / totalCircles) * 360;
      const cx =
        100 + circleRadius * gapFactor * Math.cos((angle * Math.PI) / 180);
      const cy =
        100 + circleRadius * gapFactor * Math.sin((angle * Math.PI) / 180);

      const circleFill =
        i < (progress / 100) * totalCircles ? "#5ce1e6" : "#ffffff";

      circles.push(
        <Circle
          key={i}
          cx={cx}
          cy={cy}
          r="8"
          fill={circleFill}
          stroke="#fff"
          strokeWidth="2"
        />
      );
    }

    return circles;
  };

  return (
    <PaperProvider style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/detImg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <View style={styles.successContainer}>
              <Text
                style={{
                  fontSize: 35,
                  color: "#0096b1",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  fontFamily: "Ample",
                }}
              >
                CHALLENGE COMPLETED
              </Text>
              <LottieView
                source={require("../assets/animation/success.json")}
                style={{ width: 250, height: 250 }}
                autoPlay
                loop
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("details")}
              >
                <Text style={styles.btnTxt}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        <View style={styles.bgColor} />
        <View style={styles.DetailStart}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="cover"
            style={styles.logo}
          />
          <View style={styles.description}>
            <View style={{ gap: 10 }}>
              <Text style={styles.heading}>WALK {maxSteps} STEPS</Text>
              <Text style={styles.heading}>CHALLENGE</Text>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Svg height="200" width="200">
                  {renderCircles()}
                  <SvgText
                    x="48%"
                    y="52%"
                    fontSize="30"
                    fill="#fff"
                    fontWeight={"500"}
                    textAnchor="middle"
                  >
                    {Math.round(progress)}%
                  </SvgText>
                </Svg>
              </View>
              <View>
                <Text style={styles.counter}>
                  {steps} / {maxSteps} STEPS
                </Text>
                <Text style={styles.counter}>
                  {distanceInKm.toFixed(3)} kms
                </Text>
              </View>
            </View>
            <Image
              source={require("../assets/compass.png")}
              resizeMode="cover"
              style={[
                styles.compassValue,
                {
                  transform: [
                    {
                      rotate: `${
                        magnetometerData && magnetometerData.x
                          ? magnetometerData.x.toFixed(2)
                          : "0"
                      }deg`,
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  bgColor: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#1484D9",
    opacity: 0.9,
  },
  DetailStart: {
    position: "absolute",
    flex: 1,
    padding: 15,
    height: "100%",
    width: "100%",
  },
  logo: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 40,
    height: 70,
    width: 70,
  },
  description: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  heading: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  counter: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  containerStyle: {
    backgroundColor: "transparent",
    padding: 20,
    shadowColor: "transparent",
  },
  successContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#3caf47",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  btnTxt: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  compassValue: {
    marginRight: "auto",
    marginLeft: "auto",
    height: 200,
    width: 200,
  },
});
