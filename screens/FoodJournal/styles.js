import { StyleSheet, Platform } from "react-native";

import GlobalStyles from "../../config/globalStyles";
const { phorizontal20, offWhite, lightGrey, red, darkGrey } = GlobalStyles;

const styles = StyleSheet.create({
  container: {
    ...phorizontal20,
    backgroundColor: offWhite,
    paddingTop: 10,
  },
  dayContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentDay: {
    fontSize: 20,
  },
  statsContainer: {
    // height: 160,
    paddingTop: 15,
    paddingBottom: 25,
    justifyContent: "space-between",
  },
  mealRowsContainer: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 12,
    paddingBottom: 20,
  },
  tableHeadings: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
  },
  tableHeading: {
    fontWeight: "bold",
    fontSize: 18,
    color: darkGrey,
  },
  foodHeading: {
    width: "50%",
  },
  tableData: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
  },
  dividerOuter: {
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  dividerInner: {
    // backgroundColor: lightGrey,
    height: 1,
  },
  rowMacro: {
    width: 60,
    textAlign: "right",
  },
  rowData: {
    fontSize: 18,
  },
  newItemModal: {
    height: 300,
    width: 300,
    backgroundColor: "red",
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: red,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 50,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 55,
  },
  backRightBtnRight: {
    backgroundColor: red,
    right: 0,
  },
  headerMenu: {
    paddingRight: 20,
  },
  eatSomethingContainer: {
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  eatSomething: {
    color: darkGrey,
    fontWeight: "bold",
    fontSize: 22,
  },
  addItemButtonContainer: {
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#fff",
  },
});

export const width50 = {
  width: "50%",
};

export default styles;
