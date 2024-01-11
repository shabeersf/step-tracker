import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const TaskDetailScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/detImg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.bgColor} />
        {/* Details */}
        <View style={styles.DetailStart}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="cover"
            style={styles.logo}
          />
          <View style={styles.description}>
            <View style={{ gap: 10 }}>
              <Text style={styles.heading}>WALK 1000 STEPS</Text>
              <Text style={styles.heading}>CHALLENGE</Text>
            </View>

            <Text style={styles.details}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam omnis consequatur tempore placeat fugit asperiores
              accusantium possimus iure commodi nemo laborum, quibusdam dolore,
              reiciendis harum necessitatibus voluptates labore itaque
              praesentium. Soluta fuga incidunt distinctio velit quia unde est
              sunt, error pariatur cumque ex voluptatum! Aperiam impedit sunt
              vel tenetur. Earum facere odit rerum obcaecati ratione eveniet quo
              perferendis quam modi!
            </Text>
         
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("acc")}>
              <Text style={styles.btnTxt}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <StatusBar style="light" />
    </View>
  );
};

export default TaskDetailScreen;
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
    marginTop:40,
    height: 70,
    width: 70,
  },
  description: {
    flex: 1,
    justifyContent: "space-evenly",
    padding:15
  },
  heading: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  details: {
    color: "white",
    letterSpacing: 1.7,
    lineHeight: 25,
    fontSize: 16,
    fontWeight: "500",
  },
  btn: {
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#3caf47",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  btnTxt: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});
