import { StyleSheet } from "react-native";

import GlobalStyles from "../../config/globalStyles";
const { phorizontal20, offWhite, lightGrey, red } = GlobalStyles;

const styles = StyleSheet.create({
  container: {
    ...phorizontal20,
    backgroundColor: offWhite,
    paddingTop: 20,
  },
  dayContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentDay: {
    fontSize: 16,
  },
  statsContainer: {
    height: 160,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  mealRowsContainer: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 30,
    paddingBottom: 50,
  },
  tableHeadings: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  tableHeading: {
    fontWeight: "bold",
    fontSize: 16,
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
    paddingLeft: 15,
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
  eatSomething: {},
});

export const width50 = {
  width: "50%",
};

export default styles;
